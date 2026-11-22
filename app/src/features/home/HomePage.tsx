import { getHomeContent } from '@/application/home/getHomeContent';

export function HomePage() {
  const content = getHomeContent();
  return (
    <main className="home">
      <h1>{content.title}</h1>
      <p>{content.subtitle}</p>
      <p className="status">{content.status}</p>
    </main>
  );
}
