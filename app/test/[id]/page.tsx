export default function TestPage({ params }: { params: { id: string } }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Test Dynamic Route</h1>
      <p>ID: {params.id}</p>
      <p>URL: /test/{params.id}</p>
      <a href="/">Back to Home</a>
    </div>
  )
}