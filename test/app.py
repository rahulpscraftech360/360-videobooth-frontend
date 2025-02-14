
from moviepy.editor import VideoFileClip, concatenate_videoclips

# Paths to input videos
original_video_path = "video1.mp4"   # 6-second video
processed_video_path = "video2.mp4"  # 12-second video
output_video_path = "final_output.mp4"
# Load the original and processed videos
original_clip = VideoFileClip(original_video_path).subclip(0, 1.5)  # First 3 seconds
processed_clip = VideoFileClip(processed_video_path)  # Full processed video

# Extract the remaining part of the processed video (excluding first 3 sec)
processed_remaining = processed_clip.subclip(3, processed_clip.duration)

# Resize the original clip to match processed video's resolution & FPS
original_clip = original_clip.set_fps(processed_clip.fps).resize(processed_clip.size)

# Apply a smooth crossfade transition of 0.5 seconds
final_video = concatenate_videoclips([original_clip, processed_remaining], method="compose")

# Export the final video
final_video.write_videofile(output_video_path, codec="libx264", fps=processed_clip.fps, threads=4, preset="fast")