// Shared style objects for layout and components

export const layout = {
  fontFamily: 'Inter, sans-serif',
  background: '#f8f9fb',
  color: '#222',
  minHeight: '100vh',
};

export const navBar = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.5rem 3rem',
  background: '#fff',
  boxShadow: '0 2px 8px #f0f1f2',
  position: 'sticky',
  top: 0,
  zIndex: 10,
};

export const navLink = {
  color: '#222',
  textDecoration: 'none',
  fontWeight: 600,
};

export const button = {
  background: '#0070f3',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '10px 28px',
  fontWeight: 700,
  fontSize: 16,
  cursor: 'pointer',
};

export const heroHeader = {
  position: 'relative',
  padding: 0,
  textAlign: 'center',
  background: '#fff',
  marginBottom: '2rem',
};

export const heroImage = {
  width: '100vw',
  height: '100vh',
  objectFit: 'cover',
  display: 'block',
  marginLeft: 'calc(-50vw + 50%)',
};

export const heroOverlay = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.38)',
  marginLeft: 'calc(-50vw + 50%)',
  zIndex: 1,
};

export const heroContent = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  textShadow: '0 2px 16px #2228',
  pointerEvents: 'none',
  marginLeft: 'calc(-50vw + 50%)',
  zIndex: 2,
};

export const section = {
  maxWidth: 1200,
  margin: '4rem auto',
  display: 'flex',
  flexWrap: 'wrap',
  gap: 40,
  justifyContent: 'center',
};

export const card = {
  background: '#fff',
  borderRadius: 18,
  boxShadow: '0 2px 8px #e0e0e0',
  padding: 40,
  flex: '1 1 340px',
};

export const footer = {
  margin: '4rem auto 0 auto',
  maxWidth: 1000,
  color: '#888',
  fontSize: 15,
  textAlign: 'center',
  padding: '2.5rem 0',
};
