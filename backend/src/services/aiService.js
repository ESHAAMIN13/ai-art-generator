// 1. Scalable Style Engine
export const styles = {
    anime: "anime detailed illustration, studio ghibli style, vibrant colors, masterpiece, 8k resolution, hand-drawn aesthetic",
    realistic: "ultra realistic cinematic, photorealistic, 3d render, octane render, volumetric lighting, hyper-detailed, 8k, DSLR quality",
    cyberpunk: "cyberpunk neon futuristic, dark synthwave, glowing neon lights, futuristic city, unreal engine 5, cinematic, high contrast",
    fantasy: "fantasy digital art, mystical, magical, highly detailed, cinematic lighting, ethereal, concept art, dungeons and dragons style",
    "oil-painting": "oil painting style, textured brush strokes, classic art, highly detailed, fine art, canvas texture, Rembrandt lighting",
    origami: "origami paper art, highly detailed paper folds, minimalist, pastel colors, clean studio lighting, 3d papercraft",
    "pixel-art": "retro pixel art, 16-bit, highly detailed pixel grid, vibrant colors, arcade style, nostalgic"
};

// 2. Prompt Enhancer Utility
export const enhancePrompt = (prompt, style) => {
    const basePrompt = prompt.trim();
    const styleAddition = styles[style] || styles.realistic;

    // Extra cinematic details add karna
    const cinematicEnhancements = "masterpiece, highly detailed, stunning composition, dramatic depth of field, award-winning lighting";

    return `${basePrompt}, ${styleAddition}, ${cinematicEnhancements}`;
};

// 3. Generate Pollinations AI URL with Negative Prompts & Size
export const getPollinationsUrl = (enhancedPrompt, size, negativePrompt) => {
    // Size Mapper (Aspect Ratio to Width & Height)
    let width = 1024;
    let height = 1024;

    if (size === '16:9') {
        width = 1280;
        height = 720;
    } else if (size === '9:16') {
        width = 720;
        height = 1280;
    }

    // Default Negative Prompt if none provided
    const defaultNegative = "blurry, low quality, distorted, extra limbs, bad anatomy, deformed, mutated, ugly";
    const finalNegative = negativePrompt ? `${defaultNegative}, ${negativePrompt}` : defaultNegative;

    // Random seed for uniqueness
    const randomSeed = Math.floor(Math.random() * 1000000);
    const encodedPrompt = encodeURIComponent(enhancedPrompt);
    const encodedNegative = encodeURIComponent(finalNegative);

    // Pollinations AI URL with negative prompt support
    return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${randomSeed}&negative=${encodedNegative}&nologo=true`;
};