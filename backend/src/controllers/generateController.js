import { enhancePrompt, getPollinationsUrl } from '../services/aiService.js';
import { supabase } from '../config/supabase.js';

export const generateImage = async (req, res, next) => {
    try {
        const { prompt, style, size, userId, negativePrompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                error: 'Prompt is required'
            });
        }

        // 1. Prompt ko professionally enhance karein
        const enhancedPrompt = enhancePrompt(prompt, style);

        // 2. Pollinations AI URL generate karein (with negative prompt)
        const imageUrl = getPollinationsUrl(enhancedPrompt, size, negativePrompt);

        // 3. Database mein save karein
        let savedData = null;
        if (userId) {
            const { data, error } = await supabase
                .from('images')
                .insert([
                    {
                        user_id: userId,
                        prompt,
                        enhanced_prompt: enhancedPrompt,
                        style,
                        size,
                        image_url: imageUrl,
                    }
                ])
                .select()
                .single();

            if (error) {
                console.error('Database Save Error:', error.message);
            } else {
                savedData = data;
            }
        }

        // Response send karein
        return res.status(200).json({
            success: true,
            imageUrl,
            prompt,
            enhancedPrompt,
            style,
            size,
            dbRecord: savedData
        });

    } catch (error) {
        next(error);
    }
};