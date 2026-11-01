import Foundation
import AVFoundation
import AppKit

let input = URL(fileURLWithPath: CommandLine.arguments[1])
let output = URL(fileURLWithPath: CommandLine.arguments[2])
let asset = AVURLAsset(url: input)
let duration = CMTimeGetSeconds(asset.duration)
print("Duration: \(duration)")
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.maximumSize = CGSize(width: 1600, height: 1600)
for (i, ratio) in [0.05, 0.35, 0.65, 0.90].enumerated() {
    do {
        let img = try generator.copyCGImage(at: CMTime(seconds: duration * ratio, preferredTimescale: 600), actualTime: nil)
        let rep = NSBitmapImageRep(cgImage: img)
        if let data = rep.representation(using: .png, properties: [:]) {
            let dest = output.appendingPathComponent("video-frame-\(i).png")
            try data.write(to: dest)
            print(dest.path)
        }
    } catch { print("Error: \(error)") }
}
