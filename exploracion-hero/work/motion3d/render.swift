import AppKit
import SceneKit
import Metal
import AVFoundation
import CoreVideo
import simd

let root=URL(fileURLWithPath:FileManager.default.currentDirectoryPath)
let out=root.appendingPathComponent("outputs/prototipo-entrada/prueba-3d")
let photo=NSImage(contentsOf:root.appendingPathComponent("outputs/prototipo-entrada/assets/setup.png"))!
let theta=CGFloat(22.0 * Double.pi/180), ct=cos(theta), st=sin(theta)
let W=1296,H=864,fps=60,seconds=3.1
let scene=SCNScene();scene.background.contents=NSColor(calibratedWhite:0.96,alpha:1)
let camera=SCNNode();let lens=SCNCamera();camera.camera=lens;lens.zNear=1;lens.zFar=10000;lens.wantsHDR=false
scene.rootNode.addChildNode(camera)
let renderer=SCNRenderer(device:MTLCreateSystemDefaultDevice(),options:nil);renderer.scene=scene;renderer.pointOfView=camera;renderer.autoenablesDefaultLighting=false
renderer.isJitteringEnabled=true
let geoGroup=SCNNode();scene.rootNode.addChildNode(geoGroup)
func color(_ r:CGFloat,_ g:CGFloat,_ b:CGFloat)->NSColor{NSColor(srgbRed:r,green:g,blue:b,alpha:1)}
func material(_ c:NSColor,_ rough:CGFloat=0.56)->SCNMaterial{let m=SCNMaterial();m.lightingModel = .physicallyBased;m.diffuse.contents=c;m.roughness.contents=rough;m.metalness.contents=0.0;return m}
let cream=material(color(0.88,0.81,0.71),0.48)
let orange=material(color(0.95,0.24,0.035),0.40)
let ink=material(color(0.018,0.017,0.016),0.78)
let frameMaterial=material(color(0.70,0.67,0.61),0.50)
let wellMaterial=material(color(0.15,0.125,0.09),0.9)
func world(_ x:CGFloat,_ py:CGFloat,_ y:CGFloat)->SCNVector3{SCNVector3(x-768,y,(py-512+y*st)/ct)}
let backdrop=SCNPlane(width:1536,height:CGFloat(1024/ct))
let bm=SCNMaterial();bm.lightingModel = .constant;bm.diffuse.contents=photo;bm.diffuse.magnificationFilter = .linear;bm.diffuse.minificationFilter = .linear;bm.isDoubleSided=true;backdrop.materials=[bm]
let bnode=SCNNode(geometry:backdrop);bnode.eulerAngles.x = -.pi/2;bnode.position.y = -2;bnode.categoryBitMask=1;scene.rootNode.addChildNode(bnode)
func light(_ type:SCNLight.LightType,_ intensity:CGFloat,_ temp:CGFloat,_ position:SCNVector3){let n=SCNNode();n.light=SCNLight();n.light!.type=type;n.light!.intensity=intensity;n.light!.temperature=temp;n.light!.categoryBitMask=2;n.position=position;n.look(at:SCNVector3(0,0,100));scene.rootNode.addChildNode(n)}
light(.ambient,480,5900,SCNVector3Zero)
light(.directional,680,4700,SCNVector3(-700,1100,-500))
light(.omni,180,6500,SCNVector3(600,700,500))

// Continuous rounded rings form tapered side walls, rolled bevels, and a gently dished top.
func keyGeometry(_ width:CGFloat,_ depth:CGFloat)->SCNGeometry{
 let levels:[(CGFloat,CGFloat,CGFloat)]=[(1,0.94,1.5),(1,1,3.0),(0.98,0.98,5.0),(0.91,0.92,14.5),(0.85,0.87,17.5),(0.73,0.75,18.0),(0.43,0.44,17.05),(0.10,0.10,16.7)]
 let N=48
 var verts=[SCNVector3]();var indices=[Int32]()
 for (sx,sz,y) in levels{
  let hw=width*sx/2,hd=depth*sz/2,r=min(hw,hd)*0.28
  for j in 0..<N{
   let corner=j/12
   let ang=CGFloat(j%12)/11 * CGFloat.pi/2 + CGFloat(corner) * CGFloat.pi/2
   let cx:CGFloat=(corner==0||corner==3) ? hw-r : -hw+r
   let cz:CGFloat=(corner==0||corner==1) ? hd-r : -hd+r
   verts.append(SCNVector3(cx+r*cos(ang),y,cz+r*sin(ang)))
  }
 }
 for level in 0..<(levels.count-1){for j in 0..<N{let a=Int32(level*N+j),b=Int32(level*N+(j+1)%N),c=Int32((level+1)*N+j),d=Int32((level+1)*N+(j+1)%N);indices += [a,c,b,b,c,d]}}
 let center=Int32(verts.count);verts.append(SCNVector3(0,16.65,0));for j in 0..<N{indices += [Int32((levels.count-1)*N+j),center,Int32((levels.count-1)*N+(j+1)%N)]}
 var normals=Array(repeating:SIMD3<Double>(0,0,0),count:verts.count)
 func vector(_ i:Int)->SIMD3<Double>{SIMD3<Double>(Double(verts[i].x),Double(verts[i].y),Double(verts[i].z))}
 for i in stride(from:0,to:indices.count,by:3){let a=Int(indices[i]),b=Int(indices[i+1]),c=Int(indices[i+2]);let n=simd_cross(vector(b)-vector(a),vector(c)-vector(a));normals[a]+=n;normals[b]+=n;normals[c]+=n}
 let ns=normals.map{v->SCNVector3 in let n=simd_length(v)>0 ? simd_normalize(v):SIMD3<Double>(0,1,0);return SCNVector3(CGFloat(n.x),CGFloat(n.y),CGFloat(n.z))}
 let e=SCNGeometryElement(indices:indices,primitiveType:.triangles)
 return SCNGeometry(sources:[SCNGeometrySource(vertices:verts),SCNGeometrySource(normals:ns)],elements:[e])
}
let plate=SCNBox(width:708,height:6,length:CGFloat(294/ct),chamferRadius:2.5)
plate.materials=[frameMaterial];let pn=SCNNode(geometry:plate);pn.position=world(807,744,3);pn.categoryBitMask=2;geoGroup.addChildNode(pn)
var models=[SCNNode]();var oNode:SCNNode!
func addKey(_ label:String,_ x:CGFloat,_ py:CGFloat,_ width:CGFloat=43,_ orangeKey:Bool=false,_ depth:CGFloat=38){
 let well=SCNBox(width:CGFloat(width+1),height:1,length:CGFloat(depth+1),chamferRadius:3.5);well.materials=[wellMaterial]
 let wn=SCNNode(geometry:well);wn.position=world(x,py,6.1);wn.categoryBitMask=2;geoGroup.addChildNode(wn)
 let cap=SCNNode(geometry:keyGeometry(width,depth));cap.geometry!.materials=[orangeKey ? orange:cream];cap.position=world(x,py,6.7);cap.categoryBitMask=2
 // Place the projected legend at the approved photograph's letter position.
 cap.position.z += (16.8*st)/ct
 let fontSize:CGFloat=label.count==1 ? 10.7 : label.count<=3 ? 7.1 : 5.8
 let text=SCNText(string:label,extrusionDepth:0.02);text.font=NSFont.systemFont(ofSize:fontSize,weight:.medium);text.flatness=0.12;text.materials=[ink]
 let tn=SCNNode(geometry:text);let bounds=text.boundingBox
 tn.pivot=SCNMatrix4MakeTranslation((bounds.max.x+bounds.min.x)/2,(bounds.max.y+bounds.min.y)/2,0)
 tn.eulerAngles.x = -.pi/2;tn.position=SCNVector3(0,17.08,0);tn.categoryBitMask=2;cap.addChildNode(tn)
 geoGroup.addChildNode(cap);models.append(cap);if label=="O"{oNode=cap}
}
let f:[String]=["esc","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","◉"]
for (i,s) in f.enumerated(){addKey(s,CGFloat(i==0 ? 494 : 551+(i-1)*48),621,i==0 ? 59:43)}
let nums=["`","1","2","3","4","5","6","7","8","9","0","−","+","delete"]
for (i,s) in nums.enumerated(){addKey(s,CGFloat(i==13 ? 1111:487+i*47),665,i==13 ? 70:43)}
addKey("tab",495,709,62)
for (i,s) in ["Q","W","E","R","T","Y","U","I","O","P","[","]","\\"].enumerated(){addKey(s,CGFloat(553+i*47),709)}
addKey("caps lock",501,754,77)
for(i,s)in["A","S","D","F","G","H","J","K","L",";","'"].enumerated(){addKey(s,CGFloat(563+i*47),754,43,s=="A")}
addKey("return",1102,754,89)
addKey("shift",512,799,99)
for(i,s)in["Z","X","C","V","B","N","M",",",".","/"].enumerated(){addKey(s,CGFloat(587+i*47),799)}
addKey("shift",1092,799,106)
addKey("fn",485,846,38);addKey("control",527,846,39);addKey("option",575,846,49);addKey("command",623,846,65);addKey("",777,846,230);addKey("⌘",922,846,45,true);addKey("option",975,846,48)
addKey("◀",1029,854,41,false,20);addKey("▲",1076,836,40,false,18);addKey("▼",1076,856,40,false,17);addKey("▶",1125,854,42,false,20)

func smooth(_ x:Double)->Double{let t=max(0,min(1,x));return t*t*(3-2*t)}
func smoother(_ x:Double)->Double{let t=max(0,min(1,x));return t*t*t*(t*(t*6-15)+10)}
let rest=oNode.position
func update(_ time:Double){
 SCNTransaction.begin();SCNTransaction.animationDuration=0;SCNTransaction.disableActions=true
 let p=time<0.18 ? smooth(time/0.18):time<0.28 ? 1:1-smooth((time-0.28)/0.22)
 oNode.position=SCNVector3(rest.x,rest.y-CGFloat(7*p),rest.z)
 let q=smoother((time-0.38)/2.35),z=exp(log(1024.0/100.0)*q)*100
 let anchor=world(CGFloat(930+(768-930)*q),CGFloat(709+(512-709)*q),0)
 let distance:CGFloat=2000;camera.position=SCNVector3(anchor.x,anchor.y+distance*ct,anchor.z+distance*st);camera.look(at:anchor)
 var proj=SCNMatrix4Identity;proj.m11=CGFloat(2/(z*1.5));proj.m22=CGFloat(2/z);proj.m33 = -2/9999;proj.m43 = -10001/9999;lens.projectionTransform=proj
 // The calibrated model yields to the exact approved photograph as it becomes small.
 geoGroup.opacity=1-smooth((q-0.57)/0.22)
 SCNTransaction.commit()
}
func snapshot(_ t:Double)->CGImage{
 update(t)
 let image=renderer.snapshot(atTime:t,with:CGSize(width:W,height:H),antialiasingMode:.multisampling4X)
 return image.cgImage(forProposedRect:nil,context:nil,hints:nil)!
}
func save(_ image:CGImage,_ name:String)throws{try NSBitmapImageRep(cgImage:image).representation(using:.png,properties:[:])!.write(to:out.appendingPathComponent(name))}
try FileManager.default.createDirectory(at:out,withIntermediateDirectories:true)
for (name,t) in [("01-o-reposo.png",0.0),("02-o-presionada.png",0.22),("03-teclado.png",1.35),("04-escritorio.png",2.85)]{try save(snapshot(t),name);print("Frame:",name);fflush(stdout)}
if !CommandLine.arguments.contains("--video"){exit(0)}
let target=out.appendingPathComponent("o-teclado-escritorio-3d.mp4")
if FileManager.default.fileExists(atPath:target.path){try FileManager.default.removeItem(at:target)}
let writer=try AVAssetWriter(outputURL:target,fileType:.mp4)
let input=AVAssetWriterInput(mediaType:.video,outputSettings:[AVVideoCodecKey:AVVideoCodecType.h264,AVVideoWidthKey:W,AVVideoHeightKey:H,AVVideoCompressionPropertiesKey:[AVVideoAverageBitRateKey:8500000,AVVideoExpectedSourceFrameRateKey:fps,AVVideoMaxKeyFrameIntervalKey:fps,AVVideoProfileLevelKey:AVVideoProfileLevelH264HighAutoLevel]])
input.expectsMediaDataInRealTime=false
let adaptor=AVAssetWriterInputPixelBufferAdaptor(assetWriterInput:input,sourcePixelBufferAttributes:[kCVPixelBufferPixelFormatTypeKey as String:kCVPixelFormatType_32BGRA,kCVPixelBufferWidthKey as String:W,kCVPixelBufferHeightKey as String:H,kCVPixelBufferCGImageCompatibilityKey as String:true,kCVPixelBufferCGBitmapContextCompatibilityKey as String:true])
writer.add(input);writer.startWriting();writer.startSession(atSourceTime:.zero)
for frame in 0..<Int(seconds*Double(fps)){
 try autoreleasepool{
  let image=snapshot(Double(frame)/Double(fps))
  while !input.isReadyForMoreMediaData{Thread.sleep(forTimeInterval:0.002)}
  var pb:CVPixelBuffer?;CVPixelBufferPoolCreatePixelBuffer(nil,adaptor.pixelBufferPool!,&pb)
  guard let pixel=pb else{throw NSError(domain:"PixelBuffer",code:1)}
  CVPixelBufferLockBaseAddress(pixel,[])
  let context=CGContext(data:CVPixelBufferGetBaseAddress(pixel),width:W,height:H,bitsPerComponent:8,bytesPerRow:CVPixelBufferGetBytesPerRow(pixel),space:CGColorSpace(name:CGColorSpace.sRGB)!,bitmapInfo:CGImageAlphaInfo.premultipliedFirst.rawValue|CGBitmapInfo.byteOrder32Little.rawValue)!
  context.draw(image,in:CGRect(x:0,y:0,width:W,height:H));CVPixelBufferUnlockBaseAddress(pixel,[])
  guard adaptor.append(pixel,withPresentationTime:CMTime(value:Int64(frame),timescale:Int32(fps))) else{throw writer.error ?? NSError(domain:"Encode",code:2)}
 }
 if frame%30==0{print("Rendered",frame,"/",Int(seconds*Double(fps)));fflush(stdout)}
}
input.markAsFinished();let done=DispatchSemaphore(value:0);writer.finishWriting{done.signal()};done.wait()
print("Video:",target.path,"status:",writer.status.rawValue,writer.error?.localizedDescription ?? "OK")
