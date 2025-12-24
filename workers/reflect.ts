export async function handleReflect(
	request: Request,
	env: Env,
	ctx: ExecutionContext
): Promise<Response> {
	try {
		// Parse the journal entry from request
		const { entry } = await request.json() as { entry: string };
		
		if (!entry) {
			return Response.json(
				{ error: 'Journal entry is required' },
				{ status: 400 }
			);
		}
		
		// Call Llama 3.3 for mindfulness insights
		const aiResponse = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
			messages: [
				{
					role: 'system',
					content: 'You are a mindful companion. Provide brief, compassionate insights and a thoughtful follow-up question based on the user\'s journal entry.'
				},
				{
					role: 'user',
					content: entry
				}
			]
		});
		
		// Structure the response
		const reflection = {
			prompt: entry,
			insight: aiResponse.response || 'Thank you for sharing your thoughts.',
			followUp: 'How does reflecting on this make you feel?'
		};
		
		
		
		return Response.json(reflection);
		
	} catch (error) {
		console.error('Error in reflect handler:', error);
		return Response.json(
			{ error: 'Failed to process reflection' },
			{ status: 500 }
		);
	}
}