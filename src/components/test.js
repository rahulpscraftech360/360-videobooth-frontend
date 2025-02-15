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
        BackgroundPrompt = "A peaceful countryside with golden fields";
        CharacterPrompt = "A humble farmer with a straw hat and a gentle smile";
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