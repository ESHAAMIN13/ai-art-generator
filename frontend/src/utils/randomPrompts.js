export const randomPrompts = [
    "A cyberpunk Pakistan street with neon rickshaws and futuristic food stalls",
    "An astronaut tiger floating in deep space, looking at a distant galaxy, digital art",
    "A majestic robot teacher explaining physics to cute animal students in a forest classroom",
    "A mystical tree of life with glowing neon leaves, fantasy style, cinematic lighting",
    "A cute cat warrior wearing golden samurai armor, holding a tiny glowing sword, anime style",
    "A futuristic library built inside a giant ancient tree, warm lighting, magical atmosphere",
    "A steampunk flying ship sailing through golden clouds during sunset",
    "A realistic 3D render of a cozy cabin in the snowy mountains with northern lights in the sky",
    "An ancient Egyptian pharaoh holding a futuristic holographic tablet, cyberpunk style",
    "A majestic phoenix bird rising from colorful neon ashes, highly detailed digital painting"
];

export const getRandomPrompt = (currentPrompt) => {
    const filtered = randomPrompts.filter(p => p !== currentPrompt);
    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
};