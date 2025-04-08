import React, { useEffect } from "react";

const ComfyUIPromptSender = () => {
  const sendPrompt = async () => {
    const prompt = {

      "5": {
        "inputs": {
          "text": [
            "61",
            0
          ],
          "clip": [
            "64",
            1
          ]
        },
        "class_type": "CLIPTextEncode",
        "_meta": {
          "title": "CLIP Text Encode (Prompt)"
        }
      },
      "6": {
        "inputs": {
          "conditioning": [
            "5",
            0
          ]
        },
        "class_type": "ConditioningZeroOut",
        "_meta": {
          "title": "ConditioningZeroOut"
        }
      },
      "7": {
        "inputs": {
          "guidance": 10,
          "conditioning": [
            "5",
            0
          ]
        },
        "class_type": "FluxGuidance",
        "_meta": {
          "title": "FluxGuidance"
        }
      },
      "8": {
        "inputs": {
          "positive": [
            "7",
            0
          ],
          "negative": [
            "6",
            0
          ],
          "vae": [
            "63",
            2
          ],
          "pixels": [
            "17",
            0
          ]
        },
        "class_type": "InstructPixToPixConditioning",
        "_meta": {
          "title": "InstructPixToPixConditioning"
        }
      },
      "9": {
        "inputs": {
          "seed": 14985083977157,
          "steps": 12,
          "cfg": 1,
          "sampler_name": "euler",
          "scheduler": "beta",
          "denoise": 1,
          "model": [
            "32",
            0
          ],
          "positive": [
            "25",
            0
          ],
          "negative": [
            "8",
            1
          ],
          "latent_image": [
            "8",
            2
          ]
        },
        "class_type": "KSampler",
        "_meta": {
          "title": "KSampler"
        }
      },
      "11": {
        "inputs": {
          "samples": [
            "9",
            0
          ],
          "vae": [
            "63",
            2
          ]
        },
        "class_type": "VAEDecode",
        "_meta": {
          "title": "VAE Decode"
        }
      },
      "17": {
        "inputs": {
          "ckpt_name": "depth_anything_v2_vitl.pth",
          "resolution": 1024,
          "image": [
            "50",
            0
          ]
        },
        "class_type": "DepthAnythingV2Preprocessor",
        "_meta": {
          "title": "Depth Anything V2 - Relative"
        }
      },
      "21": {
        "inputs": {
          "images": [
            "17",
            0
          ]
        },
        "class_type": "PreviewImage",
        "_meta": {
          "title": "Preview Image"
        }
      },
      "23": {
        "inputs": {
          "text": [
            "28",
            2
          ],
          "text2": "The image is a portrait of a young man sitting on a white chair. He is wearing a light blue button-down shirt and dark blue jeans. He has a slight smile on his face and is looking directly at the camera. His hair is styled in a short, curly cut and he has a goatee. The background is blurred, but it appears to be an indoor space with a large window. The lighting is soft and natural, creating a dreamy atmosphere. The overall mood of the image is relaxed and contemplative."
        },
        "class_type": "ShowText|pysssss",
        "_meta": {
          "title": "Show Text 🐍"
        }
      },
      "25": {
        "inputs": {
          "downsampling_factor": 2,
          "downsampling_function": "area",
          "mode": "keep aspect ratio",
          "weight": 0.8,
          "autocrop_margin": 0.1,
          "conditioning": [
            "8",
            0
          ],
          "style_model": [
            "26",
            0
          ],
          "clip_vision": [
            "27",
            0
          ],
          "image": [
            "50",
            0
          ]
        },
        "class_type": "ReduxAdvanced",
        "_meta": {
          "title": "ReduxAdvanced"
        }
      },
      "26": {
        "inputs": {
          "style_model_name": "flux1-redux-dev.safetensors"
        },
        "class_type": "StyleModelLoader",
        "_meta": {
          "title": "Load Style Model"
        }
      },
      "27": {
        "inputs": {
          "clip_name": "sigclip_vision_patch14_384.safetensors"
        },
        "class_type": "CLIPVisionLoader",
        "_meta": {
          "title": "Load CLIP Vision"
        }
      },
      "28": {
        "inputs": {
          "text_input": "",
          "task": "more_detailed_caption",
          "fill_mask": true,
          "keep_model_loaded": false,
          "max_new_tokens": 1024,
          "num_beams": 3,
          "do_sample": true,
          "output_mask_select": "",
          "seed": 600418659008593,
          "image": [
            "50",
            0
          ],
          "florence2_model": [
            "29",
            0
          ]
        },
        "class_type": "Florence2Run",
        "_meta": {
          "title": "Florence2Run"
        }
      },
      "29": {
        "inputs": {
          "model": "gokaygokay/Florence-2-Flux-Large",
          "precision": "fp16",
          "attention": "sdpa"
        },
        "class_type": "DownloadAndLoadFlorence2Model",
        "_meta": {
          "title": "DownloadAndLoadFlorence2Model"
        }
      },
      "32": {
        "inputs": {
          "weight": 0.9,
          "start_at": 0,
          "end_at": 1,
          "model": [
            "64",
            0
          ],
          "pulid_flux": [
            "33",
            0
          ],
          "eva_clip": [
            "34",
            0
          ],
          "face_analysis": [
            "35",
            0
          ],
          "image": [
            "50",
            0
          ]
        },
        "class_type": "ApplyPulidFlux",
        "_meta": {
          "title": "Apply PuLID Flux"
        }
      },
      "33": {
        "inputs": {
          "pulid_file": "pulid_flux_v0.9.1.safetensors"
        },
        "class_type": "PulidFluxModelLoader",
        "_meta": {
          "title": "Load PuLID Flux Model"
        }
      },
      "34": {
        "inputs": {},
        "class_type": "PulidFluxEvaClipLoader",
        "_meta": {
          "title": "Load Eva Clip (PuLID Flux)"
        }
      },
      "35": {
        "inputs": {
          "provider": "CUDA"
        },
        "class_type": "PulidFluxInsightFaceLoader",
        "_meta": {
          "title": "Load InsightFace (PuLID Flux)"
        }
      },
      "36": {
        "inputs": {
          "filename_prefix": "pencil-sketch/img",
          "images": [
            "11",
            0
          ]
        },
        "class_type": "SaveImage",
        "_meta": {
          "title": "Save Image"
        }
      },
      "37": {
        "inputs": {
          "upscale_method": "lanczos",
          "megapixels": 1,
          "image": [
            "65",
            0
          ]
        },
        "class_type": "ImageScaleToTotalPixels",
        "_meta": {
          "title": "Scale Image to Total Pixels"
        }
      },
      "40": {
        "inputs": {
          "size": "custom",
          "custom_width": 824,
          "custom_height": 824,
          "color": "#fff"
        },
        "class_type": "LayerUtility: ColorImage V2",
        "_meta": {
          "title": "LayerUtility: ColorImage V2"
        }
      },
      "41": {
        "inputs": {
          "image": [
            "37",
            0
          ]
        },
        "class_type": "GetImageSize+",
        "_meta": {
          "title": "🔧 Get Image Size"
        }
      },
      "42": {
        "inputs": {
          "width": 512,
          "height": 512,
          "upscale_method": "lanczos",
          "keep_proportion": false,
          "divisible_by": 2,
          "width_input": [
            "41",
            0
          ],
          "height_input": [
            "41",
            1
          ],
          "crop": "disabled",
          "image": [
            "40",
            0
          ]
        },
        "class_type": "ImageResizeKJ",
        "_meta": {
          "title": "Resize Image"
        }
      },
      "50": {
        "inputs": {
          "overlay_resize": "None",
          "resize_method": "nearest-exact",
          "rescale_factor": 1,
          "width": 512,
          "height": 512,
          "x_offset": 0,
          "y_offset": 0,
          "rotation": 0,
          "opacity": 0,
          "base_image": [
            "42",
            0
          ],
          "overlay_image": [
            "37",
            0
          ]
        },
        "class_type": "Image Overlay",
        "_meta": {
          "title": "Image Overlay"
        }
      },
      "60": {
        "inputs": {
          "text": "oil painting portrait rendered in a loose, impressionistic style with thick, expressive brush strokes, abstract expressionist portrait, traditional painting, harsh brushstrokes, colorful abstract background, disco elysium, [a monkey warrior]"
        },
        "class_type": "CR Text",
        "_meta": {
          "title": "🔤 CR Text"
        }
      },
      "61": {
        "inputs": {
          "text": "oil painting portrait rendered in a loose, impressionistic style with thick, expressive brush strokes, abstract expressionist portrait, traditional painting, harsh brushstrokes, colorful abstract background, disco elysium, [character description]",
          "old": "character description",
          "new": [
            "28",
            2
          ]
        },
        "class_type": "Replace Text _O",
        "_meta": {
          "title": "Replace Text _O"
        }
      },
      "63": {
        "inputs": {
          "ckpt_air": "618692@691639",
          "ckpt_name": "none",
          "api_key": "cb3b28c26f8e17cf9fe4fcec00529871",
          "download_chunks": 4,
          "download_path": "models/checkpoints"
        },
        "class_type": "CivitAI_Checkpoint_Loader",
        "_meta": {
          "title": "CivitAI Checkpoint Loader"
        }
      },
      "64": {
        "inputs": {
          "lora_air": "658958@737325",
          "lora_name": "none",
          "strength_model": 1,
          "strength_clip": 1,
          "api_key": "cb3b28c26f8e17cf9fe4fcec00529871",
          "download_chunks": 4,
          "download_path": "models/loras",
          "model": [
            "63",
            0
          ],
          "clip": [
            "63",
            1
          ]
        },
        "class_type": "CivitAI_Lora_Loader",
        "_meta": {
          "title": "CivitAI Lora Loader"
        }
      },
      "65": {
        "inputs": {
          "url_or_path": ""
        },
        "class_type": "LoadImageFromUrlOrPath",
        "_meta": {
          "title": "LoadImageFromUrlOrPath"
        }
      }
    }

    try {
      const response = await fetch("http://localhost:3001/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error("Failed to send prompt");
      }

      const result = await response.json();
      console.log("Prompt sent successfully:", result);
    } catch (error) {
      console.error("Error sending prompt:", error);
    }
  };

  // Run only once on component mount
  useEffect(() => {
    sendPrompt();
  }, []);

  return (
    <div className="p-4">
      <p className="text-gray-700">Sending ComfyUI prompt on component load...</p>
    </div>
  );
};

export default ComfyUIPromptSender;
