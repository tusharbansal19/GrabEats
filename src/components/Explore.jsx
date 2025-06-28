import { useNavigate } from 'react-router-dom';

function Explore() {
  const navigate = useNavigate();
  
  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    boxShadow: '0 4px 15px rgba(255, 107, 53, 0.3)',
  };

  const svgStyle = {
    width: '16px',
    height: '16px',
    fill: 'currentColor',
  };

  return (
    <button 
      style={buttonStyle} 
      className="mt-2" 
      onClick={() => navigate('/menu')}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 53, 0.4)';
        e.target.style.background = 'linear-gradient(135deg, #ff5722, #ff9800)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 53, 0.3)';
        e.target.style.background = 'linear-gradient(135deg, #ff6b35, #f7931e)';
      }}
    >
      <svg style={svgStyle} viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
      </svg>
      <span className="flex gap-x-2">explore Now</span>
    </button>
  );
}

export default Explore;