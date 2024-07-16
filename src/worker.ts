//  //use VS code and wrangler tail in consumer worker to see output of queue ; and also in R2 bucket queue-push



export interface Env {

	// Binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/

	MY_QUEUE: Queue<any>;
  }
  
  export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	  if (request.method === 'GET') {
		// Handle GET request
		let log = {
		  url: request.url,
		  method: request.method,
		  headers: Object.fromEntries(request.headers),
		  Date: "Date     " + Date.now(),
		};
		console.log(log);
		await env.MY_QUEUE.send(log);
		return new Response('GET request processed successfully!');
	  } else if (request.method === 'POST') {
		// Handle POST request
		const body = await request.text();
		console.log(body)
		let log = {
		  url: request.url,
		  method: request.method,
		  headers: Object.fromEntries(request.headers),
		  body: body,
		  Date: "Date     " + Date.now(),
		};
		console.log(log);
		await env.MY_QUEUE.send(log);
		return new Response('POST request processed successfully!');
	  } else {
		return new Response('Unsupported request method', { status: 405 });
	  }
	},
  };
  