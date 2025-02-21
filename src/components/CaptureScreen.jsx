

import { createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Initialize Supabase client
const supabaseUrl = "https://fuhqxfbyvrklxggecynt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1aHF4ZmJ5dnJrbHhnZ2VjeW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4ODk0MzcsImV4cCI6MjA1MzQ2NTQzN30.0r2cHr8g6nNwjaVaVGuXjo9MXNFu9_rx40j5Bb3Ib2Q";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CaptureScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, gender, character, photo } = location.state || {
    name: "",
    email: "",
    gender: "",
    character: "",
    photo: "",
  };

  const videoRef = useRef(null); // For live camera feed
  const previewVideoRef = useRef(null); // For recorded video preview
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  
  // Initialize camera
  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {facingMode:"environment"},
        });
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play(); // Ensure the video plays
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setFailed(true); // Show error if camera access fails
      }
    };

    initializeCamera();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop()); // Clean up media stream
      }
    };
  }, []);

  const startCountdown = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          startRecording();
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startRecording = () => {
    const mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorderRef.current = mediaRecorder;
    const chunks = [];

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/mp4" });
      setRecordedVideo(blob);

      // Show the preview video
      if (previewVideoRef.current) {
        previewVideoRef.current.src = URL.createObjectURL(blob);
        previewVideoRef.current.style.display = "block";
        videoRef.current.style.display = "none"; // Hide the live feed
      }
    };

    mediaRecorder.start();
    setRecording(true);

    setTimeout(() => {
      mediaRecorder.stop();
      setRecording(false);
    }, 5000);
  };

  const handleRetake = () => {
    setRecordedVideo(null);
    setCountdown(0);

    // Show the live feed and hide the preview
    if (videoRef.current) {
      videoRef.current.style.display = "block";
    }
    if (previewVideoRef.current) {
      previewVideoRef.current.style.display = "none";
      previewVideoRef.current.src = ""; // Clear the preview video
    }
  };

  const handleSend = async () => {
    setLoading(true);
    setFailed(false);

    try {
      // Step 1: Upload video to Supabase Storage
      const filePath = `videos/${Date.now()}.mp4`;
      const { error: uploadError } = await supabase.storage
        .from("360video")
        .upload(filePath, recordedVideo);

      if (uploadError) {
        throw uploadError;
      }

      // Step 2: Get the public URL of the uploaded video
      const {
        data: { publicUrl },
      } = supabase.storage.from("360video").getPublicUrl(filePath);
      console.log(`video url :${publicUrl}`);
        console.log(`character ${character}`);
        const getPromptsForCharacter = (character) => {
          let BackgroundPrompt = "";
          let CharacterPrompt = "";
        
          switch (character) {
            case "/images/male_1.jpeg":
              BackgroundPrompt ="\"0\": \"Front view - A grand celestial battlefield bathed in golden sunlight, with floating ruins of an ancient empire suspended in the sky. Molten cracks run along the marble ground, pulsating with radiant energy. Ethereal embers drift through the air, casting a warm glow. Volumetric lighting, ultra-detailed, 8K fantasy landscape.\",\n  \n  \"15\": \"Right-side profile view - A vast horizon where the sky blends from deep oranges to dark blues, resembling an eternal dusk. Towering celestial spires reach into the heavens, each adorned with glowing sigils. The air is thick with cosmic energy, and faint silhouettes of divine beings watch from afar. Hyper-detailed, cinematic, 8K fantasy backdrop.\",\n  \n  \"30\": \"Back view - A divine citadel floating above an endless sea of golden clouds, its towers reflecting the light of a burning sun. Massive celestial gates loom in the distance, partially open, revealing the abyss of time itself. The winds swirl with golden dust, creating an ethereal atmosphere. Ultra-realistic, 8K high-fantasy setting.\",\n  \n  \"45\": \"Left-side profile view - The remnants of a celestial battlefield, where shattered weapons and fallen banners are half-buried in glowing embers. The sky flickers with unstable rifts, where glimpses of different dimensions can be seen. Volumetric god rays pierce through the dust-laden air, adding to the divine yet haunting scenery. Hyper-detailed, cinematic, 8K otherworldly landscape.\",\n  \n  \"60\": \"Front view - A grand cosmic forge suspended in an infinite void, where streams of molten gold flow from floating islands, shaping divine weapons in mid-air. The Sentinel stands before a titanic anvil, glowing with the heat of a newborn star. The background pulsates with celestial energy, giving a sense of boundless power. 8K ultra-detailed, cinematic, godly atmosphere.\",\n  \n  \"75\": \"Right-side profile view - A sacred temple carved into the heart of a dying sun, its massive pillars glowing with ancient inscriptions. Solar flares burst in the distance, casting dynamic shadows across the marble floor. The air is thick with divine energy, creating a gravity-defying aura where embers float effortlessly. Hyper-detailed, cinematic, 8K celestial environment.\",\n  \n  \"90\": \"Back view - A bridge of light stretching across the cosmos, leading toward the Celestial Throne—a colossal, radiant structure suspended in deep space. Stars swirl in slow motion behind it, forming a nebula in the shape of a divine sigil. The air crackles with pure energy, and distant echoes of forgotten deities whisper through the void. Ultra-realistic, 8K cosmic fantasy backdrop.\",\n  \n  \"105\": \"Left-side profile view - The heart of an eternal storm, where lightning infused with celestial fire dances across a sky of swirling nebulae. Massive floating islands drift through the chaotic winds, each marked with the scars of ancient wars. Solaris Sentinel stands at the edge of one, overlooking the battlefield of gods. Hyper-detailed, cinematic, 8K high-fantasy background.\",\n  \n  \"120\": \"Front view - A divine council chamber at the peak of existence, surrounded by colossal statues of forgotten deities. A sacred flame burns in the center, casting long shadows across the crystalline walls. The floor is engraved with shifting cosmic patterns, glowing in response to the Sentinel’s presence. 8K ultra-detailed, cinematic, god-tier fantasy setting.\"\n",
      
              CharacterPrompt = "\n  \"0\": \"Front view - A noble warrior with a face chiseled from years of battle, his golden eyes radiating with the power of the eternal flame. His flowing, fiery-orange hair seems to glow like embers, and his sun-kissed skin is etched with ancient, glowing sigils. His expression is resolute, carrying the weight of a thousand victories. His radiant golden armor is intricately detailed with celestial engravings, reflecting the light of an unseen sun. Hyper-realistic, ultra-detailed, cinematic lighting, 8K masterpiece.\",\n  \n  \"15\": \"Right-side profile view - Solaris Sentinel’s sharp features are highlighted by the warm glow of his burning aura. His golden eyes gleam with wisdom and intensity, framed by a strong jawline and high cheekbones. His regal, battle-worn armor shimmers, covered in delicate celestial etchings that pulse with fiery energy. Volumetric lighting, hyper-detailed, ultra-realistic, 8K cinematic fantasy portrait.\",\n  \n  \"30\": \"Back view - Solaris Sentinel stands with his back to the viewer, his long, ember-like hair cascading down his gilded armor, flickering like a living flame. His broad shoulders exude strength, and his celestial cape, woven from strands of pure sunlight, flows with an ethereal radiance. The intricate engravings on the back of his armor glow with molten energy, pulsating in sync with his divine presence. The scene emphasizes his godly stature, making him appear as an unstoppable force of cosmic power. Hyper-detailed, cinematic, ultra-realistic, 8K fantasy composition.\",\n  \n  \"45\": \"Left-side profile view - Solaris Sentinel’s hair flows in slow motion, as if caught in a perpetual updraft of heat. His jawline is sharp, and his expression is calm yet fierce. The celestial runes inscribed across his skin glow brighter, resonating with an unseen force. The atmosphere around him wavers, bending to his divine energy. Hyper-realistic, 8K cinematic masterpiece.\",\n  \n  \"60\": \"Front view - The full intensity of Solaris Sentinel’s gaze pierces through the viewer’s soul. His golden eyes shine like miniature suns, and his battle-worn armor reflects the infinite energy of the celestial forge. His aura radiates an overwhelming sense of warmth and power, as if standing in the presence of a divine being. Hyper-realistic, ultra-detailed, cinematic 8K godlike fantasy portrait.\",\n  \n  \"75\": \"Right-side profile view - A different angle of Solaris Sentinel, with his celestial crown catching the divine light. His expression is both powerful and serene, exuding wisdom. His golden armor reflects the cosmic energy surrounding him, and faint embers float in the air. Hyper-realistic, ultra-detailed, cinematic 8K fantasy portrait.\",\n  \n  \"90\": \"Back view - Solaris Sentinel’s long, ember-like hair cascades down his gilded armor, flickering like a living flame. His cape, woven from strands of pure sunlight, flows with a supernatural radiance. The air behind him shimmers with golden embers, trailing in his wake. Hyper-detailed, cinematic, 8K resolution, godly presence.\",\n  \n  \"105\": \"Left-side profile view - Solaris Sentinel, his determined gaze looking into the distance. His fiery hair moves gently with a celestial breeze, and the glowing sigils on his armor pulsate with power. His battle-worn armor carries the mark of countless victories. Hyper-detailed, cinematic, ultra-realistic, 8K fantasy portrait.\",\n  \n  \"120\": \"Front view - Solaris Sentinel stands with an ethereal glow surrounding him. His piercing golden eyes shine with unwavering conviction, and the celestial sigils carved into his skin pulse with radiant energy. His form seems almost too powerful for this realm, exuding the presence of a guardian from another plane. Hyper-realistic, ultra-detailed, cinematic 8K fantasy portrait.\"\n\n"
          ;
              break;
            case "/images/male_2.jpeg":
              BackgroundPrompt = "\"0\": \"A vast and endless abyss, where jagged black spires rise from the void like the fangs of an ancient beast. The ground is a shifting reflection of dark energy, distorting all who walk upon it. The sky is a swirling mass of deep purples and blacks, illuminated by a dying eclipse. Shadows seem to move with a will of their own, whispering secrets lost to time. Cinematic, hyper-detailed, ultra-realistic, 8K dark fantasy masterpiece.\",\n  \n  \"15\": \"A ruined celestial temple, its once-glorious architecture now twisted by void energy. Dark tendrils slither through the shattered walls, pulsing with a faint, eerie light. Floating shards of forgotten relics drift through the air, untouched by time. The sky above churns with a shifting vortex of violet and black, an endless storm of cosmic despair. Ultra-detailed, hyper-realistic, breathtaking 8K dark fantasy dreamscape.\",\n  \n  \"30\": \"An ancient battlefield bathed in eternal twilight, where fallen warriors are frozen in time, their spectral echoes lingering. The air is thick with mist, illuminated only by the dim glow of spectral lanterns. The remnants of colossal statues, half-buried in shadow, tell the tale of a forgotten war between gods and void entities. Cinematic, hyper-detailed, ultra-realistic 8K haunting fantasy scene.\",\n  \n  \"45\": \"A vast and ruined city of shadow, where crumbling towers stretch toward an endless black sky. Phantom lights flicker in the distance, and an eerie silence fills the air. The structures, though abandoned, seem to breathe, their surfaces shifting and warping with unnatural motion. A massive abyss looms in the center, swallowing all light. Cinematic, ultra-detailed, hyper-realistic 8K dark fantasy masterpiece.\",\n  \n  \"60\": \"A haunted ethereal forest, where twisted trees with glowing violet veins reach toward the heavens. The air is thick with ghostly fog, shifting and twisting with each passing moment. Faint whispers echo through the trees, remnants of ancient souls trapped within. A path of blackened stone leads deeper into the darkness, its destination unknown. Hyper-realistic, ultra-detailed, breathtaking 8K fantasy nightmare.\",\n  \n  \"75\": \"A floating void citadel, suspended in a sea of swirling cosmic energy. Its architecture is both gothic and alien, with spires that seem to fold in and out of reality. The sky above is a void of endless stars, shimmering like fractured glass. A massive rift pulses at the heart of the citadel, a portal to an unknown dimension. Cinematic, ultra-detailed, hyper-realistic 8K dark fantasy dreamscape.\",\n  \n  \"90\": \"A temple of shadows, hidden within a forgotten plane. Its walls shift and stretch as if alive, the very structure breathing with dark energy. Obsidian torches burn with violet fire, casting shifting patterns across the floor. A massive throne of blackened crystal rests at the center, its seat empty, awaiting its queen. Hyper-realistic, ultra-detailed, cinematic 8k\"",
              CharacterPrompt = "\n  \"0\": \"A strikingly beautiful yet fearsome Valkyrie of the void, her piercing violet eyes glowing with dark energy. Her raven-black hair flows like liquid shadow, shifting in unseen winds. Her flawless pale skin is marked with intricate, shimmering void runes. Her lips are a deep midnight purple, and her expression is one of both wisdom and deadly intent. Her elegant, high-collared armor, woven from ethereal shadow, pulsates with deep amethyst light. Ultra-detailed, cinematic, hyper-realistic, 8K dark fantasy portrait.\",\n  \n  \"15\": \"Side profile of Nyx Valkyrie, her sharp and angular features highlighted by the eerie glow of a phantom moon. Her violet eyes shine with unearthly intensity, framed by long lashes and shadowy war paint. Her sleek, form-fitting armor reflects faint whispers of spectral light. She exudes an aura of command and mystery, her presence both chilling and hypnotic. Hyper-realistic, ultra-detailed, cinematic 8K dark fantasy masterpiece.\",\n  \n  \"30\": \"Back view of Nyx Valkyrie, her midnight-black hair cascading down her sleek obsidian armor, which glows faintly with runes of forgotten power. Her feathered mantle of shadow extends outward like a cloak woven from living darkness. The air around her bends as if reality itself recoils from her presence. Hyper-detailed, cinematic, ultra-realistic, 8K haunting fantasy portrait.\",\n  \n  \"45\": \"Three-quarter view, Nyx Valkyrie’s head tilted slightly as if hearing the whispers of the void. Her violet irises flicker with cryptic knowledge, and her lips curl in a knowing smirk. The intricate void sigils on her forehead pulse faintly, resonating with unseen cosmic forces. Her form is bathed in the dim glow of an ethereal eclipse. Hyper-detailed, cinematic, ultra-realistic, 8K dark fantasy composition.\",\n  \n  \"60\": \"Front view, Nyx Valkyrie’s gaze piercing through the darkness, a silent challenge to any who dare meet her eyes. The swirling energy of the abyss flickers around her shoulders, creating a halo of living shadow. Her armor glows with cursed runes, pulsing with forbidden power. The embodiment of void mastery, her presence is overwhelming yet impossibly graceful. Hyper-realistic, ultra-detailed, cinematic 8K shadow fantasy portrait.\",\n  \n  \"75\": \"Side view, Nyx Valkyrie standing motionless as her form seems to dissolve into darkness at the edges. Her midnight purple lips part slightly, as if whispering incantations that twist reality itself. Her armor’s intricate void engravings shimmer, reflecting ancient energies lost to time. Her silhouette is both elegant and terrifying. Hyper-realistic, 8K cinematic masterpiece.\",\n  \n  \"90\": \"Back of the head view, Nyx Valkyrie’s long obsidian-black hair shifting like liquid shadow. Her shoulders, wrapped in a cloak of swirling darkness, seem to extend and contract as if alive. The spectral glow of violet energy pulsates across her back, revealing glimpses of the abyss within her. Hyper-detailed, cinematic, ultra-realistic, 8K dark fantasy portrait.\",\n  \n  \"105\": \"Front view, Nyx Valkyrie fully engulfed in a spectral aura of darkness, her violet eyes burning like twin void stars. Her high-collared armor gives her an air of dark royalty, and the swirling energy surrounding her hums with an eerie resonance. She is a goddess of the abyss, standing between dimensions. Hyper-realistic, ultra-detailed, cinematic 8K dark fantasy portrait.\"\n\n";
              break;
            case "/images/female_1.jpeg":
              BackgroundPrompt = "A magical forest filled with glowing fireflies";
              CharacterPrompt = "A mystical sorceress in an enchanted robe";
              break;
            case "/images/female_2.jpeg":
              BackgroundPrompt = "A vibrant futuristic city with neon lights";
              CharacterPrompt = "A stylish hacker with a high-tech gadget";
              break;
            default:
              BackgroundPrompt = "A default background";
              CharacterPrompt = "A generic character description";
          }
        
          return { BackgroundPrompt, CharacterPrompt };
        };
        
        const { BackgroundPrompt, CharacterPrompt } = getPromptsForCharacter(character);
        
      const jsonData = {
        "1": {
          "inputs": {
            "ckpt_name": "Realistic_EXP.safetensors",
            "beta_schedule": "sqrt_linear (AnimateDiff)",
            "use_custom_scale_factor": false,
            "scale_factor": 0.18215
          },
          "class_type": "CheckpointLoaderSimpleWithNoiseSelect",
          "_meta": {
            "title": "Load Checkpoint w/ Noise Select 🎭🅐🅓"
          }
        },
        "2": {
          "inputs": {
            "vae_name": "vae-ft-mse-840000-ema-pruned.safetensors"
          },
          "class_type": "VAELoader",
          "_meta": {
            "title": "Load VAE"
          }
        },
        "6": {
          "inputs": {
            "text": "(bad quality, worst quality:1.2), nsfw",
            "clip": [
              "1",
              1
            ]
          },
          "class_type": "CLIPTextEncode",
          "_meta": {
            "title": "NegativePrompt"
          }
        },
        "7": {
          "inputs": {
            "seed": [
              "195",
              0
            ],
            "steps": 20,
            "cfg": 7,
            "sampler_name": "euler_ancestral",
            "scheduler": "normal",
            "denoise": 1,
            "model": [
              "93",
              0
            ],
            "positive": [
              "140",
              0
            ],
            "negative": [
              "140",
              1
            ],
            "latent_image": [
              "56",
              0
            ]
          },
          "class_type": "KSampler",
          "_meta": {
            "title": "KSampler"
          }
        },
        "10": {
          "inputs": {
            "samples": [
              "7",
              0
            ],
            "vae": [
              "2",
              0
            ]
          },
          "class_type": "VAEDecode",
          "_meta": {
            "title": "VAE Decode"
          }
        },
        "53": {
          "inputs": {
            "upscale_method": "nearest-exact",
            "width": 270,
            "height": 480,
            "crop": "disabled",
            "image": [
              "210",
              0
            ]
          },
          "class_type": "ImageScale",
          "_meta": {
            "title": "Upscale Image"
          }
        },
        "56": {
          "inputs": {
            "pixels": [
              "53",
              0
            ],
            "vae": [
              "2",
              0
            ]
          },
          "class_type": "VAEEncode",
          "_meta": {
            "title": "VAE Encode"
          }
        },
        "70": {
          "inputs": {
            "control_net_name": "openpose.safetensors"
          },
          "class_type": "ControlNetLoaderAdvanced",
          "_meta": {
            "title": "Load Advanced ControlNet Model 🛂🅐🅒🅝"
          }
        },
        "72": {
          "inputs": {
            "strength": 1,
            "start_percent": 0,
            "end_percent": 1,
            "positive": [
              "96",
              0
            ],
            "negative": [
              "6",
              0
            ],
            "control_net": [
              "70",
              0
            ],
            "image": [
              "103",
              0
            ]
          },
          "class_type": "ControlNetApplyAdvanced",
          "_meta": {
            "title": "Apply ControlNet (Advanced)"
          }
        },
        "93": {
          "inputs": {
            "model_name": "mm-Stabilized_mid.pth",
            "beta_schedule": "sqrt_linear (AnimateDiff)",
            "motion_scale": 1,
            "apply_v2_models_properly": true,
            "model": [
              "1",
              0
            ],
            "context_options": [
              "94",
              0
            ]
          },
          "class_type": "ADE_AnimateDiffLoaderWithContext",
          "_meta": {
            "title": "AnimateDiff Loader [Legacy] 🎭🅐🅓①"
          }
        },
        "94": {
          "inputs": {
            "context_length": 16,
            "context_stride": 1,
            "context_overlap": 4,
            "context_schedule": "uniform",
            "closed_loop": false,
            "fuse_method": "flat",
            "use_on_equal_length": false,
            "start_percent": 0,
            "guarantee_steps": 1
          },
          "class_type": "ADE_AnimateDiffUniformContextOptions",
          "_meta": {
            "title": "Context Options◆Looped Uniform 🎭🅐🅓"
          }
        },
        "96": {
          "inputs": {
            "text": `${BackgroundPrompt}`,
            "max_frames": 121,
            "print_output": "",
            "pre_text": [
              "101",
              0
            ],
            "app_text": "0",
            "start_frame": 0,
            "end_frame": 0,
            "pw_a": 0,
            "pw_b": 0,
            "pw_c": 0,
            "pw_d": 0,
            "clip": [
              "1",
              1
            ]
          },
          "class_type": "BatchPromptSchedule",
          "_meta": {
            "title": "BackgroundPrompt"
          }
        },
        "101": {
          "inputs": {
            "text": `${CharacterPrompt}` ,},
          "class_type": "ttN text",
          "_meta": {
            "title": "CharacterPrompt"
          }
        },
        "102": {
          "inputs": {
            "frame_rate": 30,
            "loop_count": 0,
            "filename_prefix": "Tutorial",
            "format": "video/h264-mp4",
            "pix_fmt": "yuv420p",
            "crf": 19,
            "save_metadata": true,
            "pingpong": false,
            "save_output": true,
            "images": [
              "10",
              0
            ]
          },
          "class_type": "VHS_VideoCombine",
          "_meta": {
            "title": "Default 🎥🅥🅗🅢"
          }
        },
        "103": {
          "inputs": {
            "detect_hand": "enable",
            "detect_body": "enable",
            "detect_face": "enable",
            "resolution": 512,
            "bbox_detector": "yolox_l.onnx",
            "pose_estimator": "dw-ll_ucoco_384_bs5.torchscript.pt",
            "image": [
              "53",
              0
            ]
          },
          "class_type": "DWPreprocessor",
          "_meta": {
            "title": "DWPose Estimator"
          }
        },
        "118": {
          "inputs": {
            "lora_name": "more_details.safetensors",
            "strength_model": 1.01,
            "strength_clip": 1,
            "model": [
              "1",
              0
            ],
            "clip": [
              "1",
              1
            ]
          },
          "class_type": "LoraLoader",
          "_meta": {
            "title": "Load LoRA"
          }
        },
        "137": {
          "inputs": {
            "model": [
              "93",
              0
            ],
            "clip": [
              "1",
              1
            ],
            "vae": [
              "2",
              0
            ],
            "positive": [
              "140",
              0
            ],
            "negative": [
              "140",
              1
            ]
          },
          "class_type": "ToBasicPipe",
          "_meta": {
            "title": "ToBasicPipe"
          }
        },
        "140": {
          "inputs": {
            "strength": 0.7000000000000001,
            "start_percent": 0,
            "end_percent": 1,
            "positive": [
              "72",
              0
            ],
            "negative": [
              "72",
              1
            ],
            "control_net": [
              "141",
              0
            ],
            "image": [
              "145",
              0
            ]
          },
          "class_type": "ControlNetApplyAdvanced",
          "_meta": {
            "title": "Apply ControlNet (Advanced)"
          }
        },
        "141": {
          "inputs": {
            "control_net_name": "diffusion_pytorch_model.fp16.safetensors"
          },
          "class_type": "ControlNetLoaderAdvanced",
          "_meta": {
            "title": "Load Advanced ControlNet Model 🛂🅐🅒🅝"
          }
        },
        "145": {
          "inputs": {
            "ckpt_name": "depth_anything_vitl14.pth",
            "resolution": 512,
            "image": [
              "53",
              0
            ]
          },
          "class_type": "DepthAnythingPreprocessor",
          "_meta": {
            "title": "Depth Anything"
          }
        },
        "195": {
          "inputs": {
            "seed": 1005112280961353
          },
          "class_type": "ttN seed",
          "_meta": {
            "title": "seed"
          }
        },
        "201": {
          "inputs": {
            "enabled": true,
            "swap_model": "inswapper_128.onnx",
            "facedetection": "YOLOv5l",
            "face_restore_model": "GFPGANv1.4.pth",
            "face_restore_visibility": 1,
            "codeformer_weight": 0.5,
            "detect_gender_input": "no",
            "detect_gender_source": "no",
            "input_faces_index": "0",
            "source_faces_index": "0",
            "console_log_level": 1,
            "input_image": [
              "218",
              0
            ],
            "source_image": [
              "225",
              0
            ]
          },
          "class_type": "ReActorFaceSwap",
          "_meta": {
            "title": "ReActor 🌌 Fast Face Swap"
          }
        },
        "203": {
          "inputs": {
            "frame_rate": 30,
            "loop_count": 0,
            "filename_prefix": "AnimateDiff",
            "format": "video/h264-mp4",
            "pix_fmt": "yuv420p",
            "crf": 19,
            "save_metadata": true,
            "pingpong": false,
            "save_output": true,
            "images": [
              "201",
              0
            ]
          },
          "class_type": "VHS_VideoCombine",
          "_meta": {
            "title": "Video Combine 🎥🅥🅗🅢"
          }
        },
        "210": {
          "inputs": {
            "video": `${publicUrl}`,
            "force_rate": 0,
            "force_size": "Disabled",
            "custom_width": 512,
            "custom_height": 512,
            "frame_load_cap": 120,
            "skip_first_frames": 0,
            "select_every_nth": 1
          },
          "class_type": "VHS_LoadVideoPath",
          "_meta": {
            "title": "Load Video (Path) 🎥🅥🅗🅢"
          }
        },
        "218": {
          "inputs": {
            "upscale_model": "RealESRGAN_x4plus.pth",
            "mode": "rescale",
            "rescale_factor": 4,
            "resize_width": 1080,
            "resampling_method": "bilinear",
            "supersample": "true",
            "rounding_modulus": 8,
            "image": [
              "10",
              0
            ]
          },
          "class_type": "CR Upscale Image",
          "_meta": {
            "title": "🔍 CR Upscale Image"
          }
        },
        "221": {
          "inputs": {
            "filename_prefix": `${email}`,
            "filenames": [
              "203",
              0
            ]
          },
          "class_type": "SaveVideoFilesS3",
          "_meta": {
            "title": "Save Video Files to S3"
          }
        },
        "225": {
          "inputs": {
            "url_or_path": `${photo}`
          },
          "class_type": "LoadImageFromUrlOrPath",
          "_meta": {
            "title": "LoadImageFromUrlOrPath"
          }
        }
      }
 const jsondata2={
  "1": {
    "inputs": {
      "ckpt_name": "realism.safetensors",
      "beta_schedule": "sqrt_linear (AnimateDiff)",
      "use_custom_scale_factor": false,
      "scale_factor": 0.18215
    },
    "class_type": "CheckpointLoaderSimpleWithNoiseSelect",
    "_meta": {
      "title": "Load Checkpoint w/ Noise Select 🎭🅐🅓"
    }
  },
  "2": {
    "inputs": {
      "vae_name": "vae-ft-mse-840000-ema-pruned.safetensors"
    },
    "class_type": "VAELoader",
    "_meta": {
      "title": "Load VAE"
    }
  },
  "6": {
    "inputs": {
      "text": "(bad quality, worst quality:1.2), nsfw",
      "clip": [
        "1",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP Text Encode (Prompt)"
    }
  },
  "7": {
    "inputs": {
      "seed": [
        "195",
        0
      ],
      "steps": 20,
      "cfg": 7,
      "sampler_name": "euler_ancestral",
      "scheduler": "normal",
      "denoise": 1,
      "model": [
        "93",
        0
      ],
      "positive": [
        "140",
        0
      ],
      "negative": [
        "140",
        1
      ],
      "latent_image": [
        "56",
        0
      ]
    },
    "class_type": "KSampler",
    "_meta": {
      "title": "KSampler"
    }
  },
  "10": {
    "inputs": {
      "samples": [
        "7",
        0
      ],
      "vae": [
        "2",
        0
      ]
    },
    "class_type": "VAEDecode",
    "_meta": {
      "title": "VAE Decode"
    }
  },
  "53": {
    "inputs": {
      "upscale_method": "nearest-exact",
      "width": 270,
      "height": 480,
      "crop": "disabled",
      "image": [
        "209",
        0
      ]
    },
    "class_type": "ImageScale",
    "_meta": {
      "title": "Upscale Image"
    }
  },
  "56": {
    "inputs": {
      "pixels": [
        "53",
        0
      ],
      "vae": [
        "2",
        0
      ]
    },
    "class_type": "VAEEncode",
    "_meta": {
      "title": "VAE Encode"
    }
  },
  "70": {
    "inputs": {
      "control_net_name": "control_v11p_sd15_openpose_fp16.safetensors"
    },
    "class_type": "ControlNetLoaderAdvanced",
    "_meta": {
      "title": "Load Advanced ControlNet Model 🛂🅐🅒🅝"
    }
  },
  "72": {
    "inputs": {
      "strength": 1,
      "start_percent": 0,
      "end_percent": 1,
      "positive": [
        "96",
        0
      ],
      "negative": [
        "6",
        0
      ],
      "control_net": [
        "70",
        0
      ],
      "image": [
        "103",
        0
      ]
    },
    "class_type": "ControlNetApplyAdvanced",
    "_meta": {
      "title": "Apply ControlNet"
    }
  },
  "93": {
    "inputs": {
      "model_name": "mm-Stabilized_mid.pth",
      "beta_schedule": "sqrt_linear (AnimateDiff)",
      "motion_scale": 1,
      "apply_v2_models_properly": true,
      "model": [
        "1",
        0
      ],
      "context_options": [
        "94",
        0
      ]
    },
    "class_type": "ADE_AnimateDiffLoaderWithContext",
    "_meta": {
      "title": "AnimateDiff Loader [Legacy] 🎭🅐🅓①"
    }
  },
  "94": {
    "inputs": {
      "context_length": 16,
      "context_stride": 1,
      "context_overlap": 4,
      "context_schedule": "uniform",
      "closed_loop": false,
      "fuse_method": "flat",
      "use_on_equal_length": false,
      "start_percent": 0,
      "guarantee_steps": 1
    },
    "class_type": "ADE_AnimateDiffUniformContextOptions",
    "_meta": {
      "title": "Context Options◆Looped Uniform 🎭🅐🅓"
    }
  },
  "96": {
    "inputs": {
      "text": `${BackgroundPrompt}`,
       "max_frames": 121,
      "print_output": "",
      "pre_text": [
        "101",
        0
      ],
      "app_text": "0",
      "start_frame": 0,
      "end_frame": 0,
      "pw_a": 0,
      "pw_b": 0,
      "pw_c": 0,
      "pw_d": 0,
      "clip": [
        "1",
        1
      ]
    },
    "class_type": "BatchPromptSchedule",
    "_meta": {
      "title": "Batch Prompt Schedule 📅🅕🅝"
    }
  },
  "101": {
    "inputs": {
      "text": `${CharacterPrompt}` },
    "class_type": "ttN text",
    "_meta": {
      "title": "text"
    }
  },
  "102": {
    "inputs": {
      "frame_rate": 30,
      "loop_count": 0,
      "filename_prefix": "Tutorial",
      "format": "video/h264-mp4",
      "pix_fmt": "yuv420p",
      "crf": 19,
      "save_metadata": true,
      "trim_to_audio": false,
      "pingpong": false,
      "save_output": true,
      "images": [
        "10",
        0
      ]
    },
    "class_type": "VHS_VideoCombine",
    "_meta": {
      "title": "Default 🎥🅥🅗🅢"
    }
  },
  "103": {
    "inputs": {
      "detect_hand": "enable",
      "detect_body": "enable",
      "detect_face": "enable",
      "resolution": 512,
      "bbox_detector": "yolox_l.onnx",
      "pose_estimator": "dw-ll_ucoco_384_bs5.torchscript.pt",
      "scale_stick_for_xinsr_cn": "disable",
      "image": [
        "53",
        0
      ]
    },
    "class_type": "DWPreprocessor",
    "_meta": {
      "title": "DWPose Estimator"
    }
  },
  "118": {
    "inputs": {
      "lora_name": "more_details.safetensors",
      "strength_model": 1.01,
      "strength_clip": 1,
      "model": [
        "1",
        0
      ],
      "clip": [
        "1",
        1
      ]
    },
    "class_type": "LoraLoader",
    "_meta": {
      "title": "Load LoRA"
    }
  },
  "137": {
    "inputs": {
      "model": [
        "93",
        0
      ],
      "clip": [
        "1",
        1
      ],
      "vae": [
        "2",
        0
      ],
      "positive": [
        "140",
        0
      ],
      "negative": [
        "140",
        1
      ]
    },
    "class_type": "ToBasicPipe",
    "_meta": {
      "title": "ToBasicPipe"
    }
  },
  "140": {
    "inputs": {
      "strength": 0.7000000000000001,
      "start_percent": 0,
      "end_percent": 1,
      "positive": [
        "72",
        0
      ],
      "negative": [
        "72",
        1
      ],
      "control_net": [
        "141",
        0
      ],
      "image": [
        "145",
        0
      ]
    },
    "class_type": "ControlNetApplyAdvanced",
    "_meta": {
      "title": "Apply ControlNet"
    }
  },
  "141": {
    "inputs": {
      "control_net_name": "control_v11f1p_sd15_depth.safetensors"
    },
    "class_type": "ControlNetLoaderAdvanced",
    "_meta": {
      "title": "Load Advanced ControlNet Model 🛂🅐🅒🅝"
    }
  },
  "145": {
    "inputs": {
      "ckpt_name": "depth_anything_vitl14.pth",
      "resolution": 512,
      "image": [
        "53",
        0
      ]
    },
    "class_type": "DepthAnythingPreprocessor",
    "_meta": {
      "title": "Depth Anything"
    }
  },
  "195": {
    "inputs": {
      "seed": 596001331412568
    },
    "class_type": "ttN seed",
    "_meta": {
      "title": "seed"
    }
  },
  "201": {
    "inputs": {
      "enabled": true,
      "swap_model": "inswapper_128.onnx",
      "facedetection": "YOLOv5l",
      "face_restore_model": "GFPGANv1.4.pth",
      "face_restore_visibility": 1,
      "codeformer_weight": 0.5,
      "detect_gender_input": "no",
      "detect_gender_source": "no",
      "input_faces_index": "0",
      "source_faces_index": "0",
      "console_log_level": 1,
      "input_image": [
        "208",
        0
      ],
      "source_image": [
        "210",
        0
      ]
    },
    "class_type": "ReActorFaceSwap",
    "_meta": {
      "title": "ReActor 🌌 Fast Face Swap"
    }
  },
  "203": {
    "inputs": {
      "frame_rate": 30,
      "loop_count": 0,
      "filename_prefix": "AnimateDiff",
      "format": "video/h264-mp4",
      "pix_fmt": "yuv420p",
      "crf": 19,
      "save_metadata": true,
      "trim_to_audio": false,
      "pingpong": false,
      "save_output": true,
      "images": [
        "201",
        0
      ]
    },
    "class_type": "VHS_VideoCombine",
    "_meta": {
      "title": "Video Combine 🎥🅥🅗🅢"
    }
  },
  "208": {
    "inputs": {
      "upscale_model": "RealESRGAN_x2.pth",
      "mode": "rescale",
      "rescale_factor": 4,
      "resize_width": 1080,
      "resampling_method": "lanczos",
      "supersample": "true",
      "rounding_modulus": 8,
      "image": [
        "10",
        0
      ]
    },
    "class_type": "CR Upscale Image",
    "_meta": {
      "title": "🔍 CR Upscale Image"
    }
  },
  "209": {
    "inputs": {
      "video": `${publicUrl}`,
      "force_rate": 0,
      "custom_width": 0,
      "custom_height": 0,
      "frame_load_cap": 121,
      "skip_first_frames": 0,
      "select_every_nth": 1,
      "format": "AnimateDiff"
    },
    "class_type": "VHS_LoadVideoPath",
    "_meta": {
      "title": "Load Video (Path) 🎥🅥🅗🅢"
    }
  },
  "210": {
    "inputs": {
      "url": `${photo}`
    },
    "class_type": "Load Image From Url (mtb)",
    "_meta": {
      "title": "Load Image From Url (mtb)"
    }
  },
  "211": {
    "inputs": {
      "filename_prefix": `${email}`,
      "filenames": [
        "203",
        0
      ]
    },
    "class_type": "SaveVideoFilesS3",
    "_meta": {
      "title": "Save Video Files to S3"
    }
  }
}
  
      // Step 3: Combine form data with video URL
      const payload = {
        username: name,
        email,
        gender,
        workflow: jsondata2, // Include the JSON data in the payloa
      };

      console.log(`payload  json ${payload.jsonData}`);

      // Step 4: Send data to your API
      const response = await fetch("https://clownfish-app-8eylc.ondigitalocean.app/process-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to API");
      }
//updated//

      // Navigate to success page
      navigate("/success");
    } catch (error) {
      console.error("Error:", error);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setFailed(false);
    setRecordedVideo(null);
    setCountdown(0);
    navigate('/form'); 
  };
  return  (
    <div
      className="flex items-start min-h-screen bg-center bg-cover"
      style={{ backgroundImage: "url(/images/iPad.png)" }}
    >
      <div className="flex mt-20 flex-col items-center w-full flex-1 px-4 sm:px-8 lg:px-20 text-center">
        <div className="w-full max-w-2xl">
          <h1
            className="text-2xl sm:text-2xl lg:text-2xl mt-10 sm:mt-15 font-semibold text-white mb-4 sm:mb-8"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            SMILE FOR THE CAMERA
            {/* <br /> */}
           
          </h1>

          {/* Video Container */}
          <div className="relative w-auto max-h-[60vh] aspect-[9/16] rounded-lg overflow-hidden flex justify-center items-center bg-gray-200 mx-auto">
            {/* Live camera feed */}
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ display: recordedVideo ? "none" : "block" }}
            />

            {/* Recorded video preview */}
            <video
              ref={previewVideoRef}
              controls
              className="w-full h-full object-cover"
              style={{ display: recordedVideo ? "block" : "none" }}
            />

            {/* Countdown */}
            {countdown > 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-6xl sm:text-8xl font-bold text-white">
                {countdown}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-8">
            {!recordedVideo ? (
              <button
                className="w-full sm:w-[350px] h-[60px] sm:h-[75px] bg-cover bg-center font-bold text-red-500 rounded focus:outline-none focus:shadow-outline"
                style={{
                  backgroundImage: "url(/images/redbutton.png)",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "20px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
                onClick={startCountdown}
                disabled={countdown > 0 || recording}
              >
                {recording ? "Recording..." : "Capture"}
              </button>
            ) : (
              <>
                <div className="mb-4 flex flex-row justify-center align-center gap-3">
                  <button
                    className="w-full sm:w-[250px] h-[60px] sm:h-[75px] bg-cover bg-center font-bold text-red-500 rounded focus:outline-none focus:shadow-outline"
                    style={{
                      backgroundImage: "url(/images/redbutton.png)",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "20px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                    onClick={handleRetake}
                  >
                    Retake
                  </button>
                {/* </div>
                <div> */}
                  <button
                    className="w-full sm:w-[250px] h-[60px] sm:h-[75px] bg-cover bg-center font-bold text-red-500 rounded focus:outline-none focus:shadow-outline"
                    style={{
                      backgroundImage: "url(/images/greenbutton.png)",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "20px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                    onClick={handleSend}
                  >
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Loading Screen */}
      {loading && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90"
          style={{
            backgroundImage: "url(/images/iPad.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-center animate-pulse">
            <div className="text-white text-4xl sm:text-6xl font-bold mb-4">
              {/* Sending... */}
            </div>
            <div className="flex justify-center">
              <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      )}

      {/* Failed Popup */}
      {failed && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90"
          style={{
            backgroundImage: "url(/images/iPad.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-white p-6 sm:p-10 rounded-lg text-center shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100">
            <h2 className="text-2xl sm:text-4xl font-bold text-red-600 mb-4 sm:mb-6">
              Failed
            </h2>
            <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8">
              Something went wrong. Please try again.
            </p>
            <button
              className="px-6 sm:px-8 py-2 sm:py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105"
              onClick={handleTryAgain}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );

}
