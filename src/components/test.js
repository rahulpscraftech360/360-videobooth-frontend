
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
        "text": "\"0\": \"A vast and endless abyss, where jagged black spires rise from the void like the fangs of an ancient beast. The ground is a shifting reflection of dark energy, distorting all who walk upon it. The sky is a swirling mass of deep purples and blacks, illuminated by a dying eclipse. Shadows seem to move with a will of their own, whispering secrets lost to time. Cinematic, hyper-detailed, ultra-realistic, 8K dark fantasy masterpiece.\",\n  \n  \"15\": \"A ruined celestial temple, its once-glorious architecture now twisted by void energy. Dark tendrils slither through the shattered walls, pulsing with a faint, eerie light. Floating shards of forgotten relics drift through the air, untouched by time. The sky above churns with a shifting vortex of violet and black, an endless storm of cosmic despair. Ultra-detailed, hyper-realistic, breathtaking 8K dark fantasy dreamscape.\",\n  \n  \"30\": \"An ancient battlefield bathed in eternal twilight, where fallen warriors are frozen in time, their spectral echoes lingering. The air is thick with mist, illuminated only by the dim glow of spectral lanterns. The remnants of colossal statues, half-buried in shadow, tell the tale of a forgotten war between gods and void entities. Cinematic, hyper-detailed, ultra-realistic 8K haunting fantasy scene.\",\n  \n  \"45\": \"A vast and ruined city of shadow, where crumbling towers stretch toward an endless black sky. Phantom lights flicker in the distance, and an eerie silence fills the air. The structures, though abandoned, seem to breathe, their surfaces shifting and warping with unnatural motion. A massive abyss looms in the center, swallowing all light. Cinematic, ultra-detailed, hyper-realistic 8K dark fantasy masterpiece.\",\n  \n  \"60\": \"A haunted ethereal forest, where twisted trees with glowing violet veins reach toward the heavens. The air is thick with ghostly fog, shifting and twisting with each passing moment. Faint whispers echo through the trees, remnants of ancient souls trapped within. A path of blackened stone leads deeper into the darkness, its destination unknown. Hyper-realistic, ultra-detailed, breathtaking 8K fantasy nightmare.\",\n  \n  \"75\": \"A floating void citadel, suspended in a sea of swirling cosmic energy. Its architecture is both gothic and alien, with spires that seem to fold in and out of reality. The sky above is a void of endless stars, shimmering like fractured glass. A massive rift pulses at the heart of the citadel, a portal to an unknown dimension. Cinematic, ultra-detailed, hyper-realistic 8K dark fantasy dreamscape.\",\n  \n  \"90\": \"A temple of shadows, hidden within a forgotten plane. Its walls shift and stretch as if alive, the very structure breathing with dark energy. Obsidian torches burn with violet fire, casting shifting patterns across the floor. A massive throne of blackened crystal rests at the center, its seat empty, awaiting its queen. Hyper-realistic, ultra-detailed, cinematic 8k\"",
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
        "text": "\n  \"0\": \"Front view of a A strikingly beautiful yet fearsome Valkyrie of the void, her piercing violet eyes glowing with dark energy. Her raven-black hair flows like liquid shadow, shifting in unseen winds. Her flawless pale skin is marked with intricate, shimmering void runes. Her lips are a deep midnight purple, and her expression is one of both wisdom and deadly intent. Her elegant, high-collared armor, woven from ethereal shadow, pulsates with deep amethyst light. Ultra-detailed, cinematic, hyper-realistic, 8K dark fantasy portrait.\",\n  \n  \"15\": \"Right side view of  Nyx Valkyrie, her sharp and angular features highlighted by the eerie glow of a phantom moon. Her violet eyes shine with unearthly intensity, framed by long lashes and shadowy war paint. Her sleek, form-fitting armor reflects faint whispers of spectral light. She exudes an aura of command and mystery, her presence both chilling and hypnotic. Hyper-realistic, ultra-detailed, cinematic 8K dark fantasy masterpiece.\",\n  \n  \"30\": \"Back head view of Nyx Valkyrie, her midnight-black hair cascading down her sleek obsidian armor, which glows faintly with runes of forgotten power. Her feathered mantle of shadow extends outward like a cloak woven from living darkness. The air around her bends as if reality itself recoils from her presence. Hyper-detailed, cinematic, ultra-realistic, 8K haunting fantasy portrait.\",\n  \n  \"45\": \"Left side view, Nyx Valkyrie’s head tilted slightly as if hearing the whispers of the void. Her violet irises flicker with cryptic knowledge, and her lips curl in a knowing smirk. The intricate void sigils on her forehead pulse faintly, resonating with unseen cosmic forces. Her form is bathed in the dim glow of an ethereal eclipse. Hyper-detailed, cinematic, ultra-realistic, 8K dark fantasy composition.\",\n  \n  \"60\": \"Front view, Nyx Valkyrie’s gaze piercing through the darkness, a silent challenge to any who dare meet her eyes. The swirling energy of the abyss flickers around her shoulders, creating a halo of living shadow. Her armor glows with cursed runes, pulsing with forbidden power. The embodiment of void mastery, her presence is overwhelming yet impossibly graceful. Hyper-realistic, ultra-detailed, cinematic 8K shadow fantasy portrait.\",\n  \n  \"75\": \"Right Side view, Nyx Valkyrie standing motionless as her form seems to dissolve into darkness at the edges. Her midnight purple lips part slightly, as if whispering incantations that twist reality itself. Her armor’s intricate void engravings shimmer, reflecting ancient energies lost to time. Her silhouette is both elegant and terrifying. Hyper-realistic, 8K cinematic masterpiece.\",\n  \n  \"90\": \"Back of the head view, Nyx Valkyrie’s long obsidian-black hair shifting like liquid shadow. Her shoulders, wrapped in a cloak of swirling darkness, seem to extend and contract as if alive. The spectral glow of violet energy pulsates across her back, revealing glimpses of the abyss within her. Hyper-detailed, cinematic, ultra-realistic, 8K dark fantasy portrait.\",\n  \n  \"105\": \"Front view, Nyx Valkyrie fully engulfed in a spectral aura of darkness, her violet eyes burning like twin void stars. Her high-collared armor gives her an air of dark royalty, and the swirling energy surrounding her hums with an eerie resonance. She is a goddess of the abyss, standing between dimensions. Hyper-realistic, ultra-detailed, cinematic 8K dark fantasy portrait.\"\n\n"
      },
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
        "seed": 1082633858670093
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
          "10",
          0
        ],
        "source_image": [
          "215",
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
    "209": {
      "inputs": {
        "filename_prefix": "VideoFiles",
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
    "210": {
      "inputs": {
        "video": "",
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
    "211": {
      "inputs": {
        "scale_ratio": 4,
        "noise_augmentation": 0,
        "images": [
          "201",
          0
        ]
      },
      "class_type": "SD_4XUpscale_Conditioning",
      "_meta": {
        "title": "SD_4XUpscale_Conditioning"
      }
    },
    "212": {
      "inputs": {
        "samples": [
          "211",
          2
        ]
      },
      "class_type": "VAEDecode",
      "_meta": {
        "title": "VAE Decode"
      }
    },
    "214": {
      "inputs": {
        "frame_rate": 8,
        "loop_count": 0,
        "filename_prefix": "AnimateDiff",
        "format": "image/gif",
        "pingpong": false,
        "save_output": true,
        "images": [
          "212",
          0
        ]
      },
      "class_type": "VHS_VideoCombine",
      "_meta": {
        "title": "Video Combine 🎥🅥🅗🅢"
      }
    },
    "215": {
      "inputs": {
        "image_path": [
          "216",
          0
        ]
      },
      "class_type": "LoadImageByPath",
      "_meta": {
        "title": "Load Image By Path"
      }
    },
    "216": {
      "inputs": {
        "string": ""
      },
      "class_type": "String Literal",
      "_meta": {
        "title": "String Literal"
      }
    }
  }