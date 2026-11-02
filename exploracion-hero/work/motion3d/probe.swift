import AppKit
import SceneKit
import Metal
print("Metal:",MTLCreateSystemDefaultDevice()?.name ?? "unavailable")
let scene=SCNScene()
let n=SCNNode(geometry:SCNBox(width:1,height:1,length:1,chamferRadius:0.12))
n.geometry?.firstMaterial?.diffuse.contents=NSColor.orange
scene.rootNode.addChildNode(n)
let camera=SCNNode(); camera.camera=SCNCamera(); camera.position=SCNVector3(0,2,4); camera.look(at:SCNVector3Zero);scene.rootNode.addChildNode(camera)
let r=SCNRenderer(device:MTLCreateSystemDefaultDevice(),options:nil);r.scene=scene;r.pointOfView=camera;r.autoenablesDefaultLighting=true
let image=r.snapshot(atTime:0,with:CGSize(width:640,height:480),antialiasingMode:.multisampling4X)
let bitmap=NSBitmapImageRep(data:image.tiffRepresentation!)!
try bitmap.representation(using:.png,properties:[:])!.write(to:URL(fileURLWithPath:CommandLine.arguments[1]))
print("Render OK")
