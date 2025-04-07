import React from "react";

const ComfyUIPromptSender = () => {
  const sendPrompt = async () => {
    // Define the prompt
    const prompt = {
      "3": {
        class_type: "KSampler",
        inputs: {
          cfg: 8,
          denoise: 1,
          latent_image: ["5", 0],
          model: ["4", 0],
          negative: ["7", 0],
          positive: ["6", 0],
          sampler_name: "euler",
          scheduler: "normal",
          seed: 5, // Updated seed
          steps: 20
        }
      },
      "4": {
        class_type: "CheckpointLoaderSimple",
        inputs: {
          ckpt_name: "v1-5-pruned-emaonly.safetensors"
        }
      },
      "5": {
        class_type: "EmptyLatentImage",
        inputs: {
          batch_size: 1,
          height: 512,
          width: 512
        }
      },
      "6": {
        class_type: "CLIPTextEncode",
        inputs: {
          clip: ["4", 1],
          text: "masterpiece best quality man" // Updated prompt
        }
      },
      "7": {
        class_type: "CLIPTextEncode",
        inputs: {
          clip: ["4", 1],
          text: "bad hands"
        }
      },
      "8": {
        class_type: "VAEDecode",
        inputs: {
          samples: ["3", 0],
          vae: ["4", 2]
        }
      },
      "9": {
        class_type: "SaveImage",
        inputs: {
          filename_prefix: "ComfyUI",
          images: ["8", 0]
        }
      }
    };

    try {
      const response = await fetch("http://213.173.110.225:27112/prompt", {
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

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={sendPrompt}
      >
        Send ComfyUI Prompt
      </button>
    </div>
  );
};

export default ComfyUIPromptSender;
