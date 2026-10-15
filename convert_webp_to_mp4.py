"""Extract frames from an animated WebP and create an MP4 using imageio-ffmpeg's
bundled ffmpeg binary. Output is a compact, browser-friendly MP4 we can play
with a real <video> element.

Usage:  python convert_webp_to_mp4.py
"""
import os
from PIL import Image
import imageio.v2 as imageio
import imageio_ffmpeg

WEBP = r"C:/Users/Asus/OneDrive/Desktop/weeding/public/wedding-invitation.webp"
OUT = r"C:/Users/Asus/OneDrive/Desktop/weeding/public/wedding-invitation.mp4"
TMP = r"C:/Users/Asus/OneDrive/Desktop/weeding/public/_frames_tmp"

os.makedirs(TMP, exist_ok=True)

# Discover the bundled ffmpeg binary.
ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
print(f"Using ffmpeg: {ffmpeg_exe}")

# 1) Extract frames + durations from the animated WebP.
im = Image.open(WEBP)
n = getattr(im, "n_frames", 1)
print(f"Animated WebP: {n} frames, size {im.size}")

# Pillow exposes per-frame durations in milliseconds via im.info / im.tell / im.seek.
durations = []
for i in range(n):
    im.seek(i)
    durations.append(im.info.get("duration", 40))  # default 40 ms if missing
    # Save each frame as a temporary PNG so ffmpeg can ingest a real video stream.
    rgb = im.convert("RGB")
    rgb.save(os.path.join(TMP, f"frame_{i:06d}.png"))

avg_fps = 1000.0 / (sum(durations) / max(len(durations), 1))
print(f"Avg fps from durations: {avg_fps:.2f}")

# 2) Build an MP4 from the frame images via the bundled ffmpeg.
writer = imageio.get_writer(
    OUT,
    fps=avg_fps,
    codec="libx264",
    quality=8,
    ffmpeg_params=[
        "-pix_fmt", "yuv420p",
        "-vf", "scale=1280:-2",
        "-movflags", "+faststart",
        "-preset", "fast",
        "-crf", "24",
    ],
    macro_block_size=1,
)

for i in range(n):
    img = imageio.imread(os.path.join(TMP, f"frame_{i:06d}.png"))
    writer.append_data(img)

writer.close()

# 3) Clean up temporary frames.
for f in os.listdir(TMP):
    try:
        os.remove(os.path.join(TMP, f))
    except OSError:
        pass
try:
    os.rmdir(TMP)
except OSError:
    pass

print(f"Wrote: {OUT}")
print(f"  Size: {os.path.getsize(OUT) / (1024 * 1024):.2f} MB")