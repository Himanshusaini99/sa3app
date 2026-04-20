import { Hono } from 'hono';
import catchAsync from '../utils/catchAsync.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';

const aiRoutes = new Hono();

aiRoutes.use('/*', authMiddleware);

aiRoutes.post('/chat', catchAsync(async (c) => {
    const body = await c.req.json();
    const messages = body.messages || [];

    const lastMessage = messages[messages.length - 1];
    const userText = lastMessage?.content || '';

    const response = await fetch(
        'https://api.groq.com/openai/v1/chat/completions',
        {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [{ role: 'user', content: userText }]
            })
        }
    );

    const data = await response.json() as any;
    console.log('Groq response:', JSON.stringify(data));
    const text = data?.choices?.[0]?.message?.content || 'Sorry, I could not process that.';

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        start(controller) {
            controller.enqueue(encoder.encode(`0:"${text.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"\n`));
            controller.close();
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
        }
    });
}));

export default aiRoutes;