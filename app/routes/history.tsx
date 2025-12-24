import { Link } from "react-router";
import { useLoaderData } from "react-router";
import type { Route } from "./+types/history";
import "./history.css";

export async function loader({ context }: Route.LoaderArgs) {
	const { env } = context.cloudflare;
	
	// Get all stored reflections
	const list = await env.REFLECTIONS.list();
	const reflections = await Promise.all(
		list.keys.map(async (key) => {
			const data = await env.REFLECTIONS.get(key.name);
			return data ? JSON.parse(data) : null;
		})
	);
	
	return reflections.filter(Boolean).sort((a, b) => b.timestamp - a.timestamp);
}

export default function History({ loaderData }: Route.ComponentProps) {
	const reflections = loaderData;
	
	return (
		<>
			<Link to="/" className="back-button">← Home</Link>
			
			<div className="history-container">
				<h1 className="history-title">Past Reflections</h1>
				
				{reflections.length === 0 ? (
					<p className="no-entries">No reflections yet. Start journaling!</p>
				) : (
					<div className="reflections-list">
						{reflections.map((reflection, index) => (
							<div key={index} className="reflection-card">
								<p className="reflection-date">
									{new Date(reflection.timestamp).toLocaleDateString()}
								</p>
								<p className="reflection-prompt">
									<strong>Your entry:</strong> {reflection.prompt}
								</p>
								<p className="reflection-insight">
									<strong>Insight:</strong> {reflection.insight}
								</p>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
}