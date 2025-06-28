import "../css/Dinput.css";

function Dinput(){
    /* From Uiverse.io by liyaxu123 */ 
    
    const formControlStyle = {
        position: 'relative',
        margin: '20px 0',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px 0',
        fontSize: '16px',
        color: '#fff',
        border: 'none',
        borderBottom: '2px solid #ddd',
        outline: 'none',
        background: 'transparent',
        transition: 'border-color 0.3s ease',
    };

    const labelStyle = {
        position: 'absolute',
        top: '0',
        left: '0',
        padding: '10px 0',
        fontSize: '16px',
        color: '#666',
        pointerEvents: 'none',
        transition: '0.3s ease all',
    };

    const spanStyle = {
        display: 'inline-block',
        transition: 'transform 0.3s ease',
    };

    return (
        <div style={formControlStyle} className="form-control">
            <input 
                type="value" 
                required="" 
                style={inputStyle}
                onFocus={(e) => {
                    e.target.style.borderBottomColor = '#ff6b35';
                    e.target.nextElementSibling.style.top = '-20px';
                    e.target.nextElementSibling.style.fontSize = '12px';
                    e.target.nextElementSibling.style.color = '#ff6b35';
                }}
                onBlur={(e) => {
                    if (!e.target.value) {
                        e.target.style.borderBottomColor = '#ddd';
                        e.target.nextElementSibling.style.top = '0';
                        e.target.nextElementSibling.style.fontSize = '16px';
                        e.target.nextElementSibling.style.color = '#666';
                    }
                }}
            />
            <label style={labelStyle}>
                <span style={spanStyle} className="transition-delay:0ms">U</span>
                <span style={spanStyle} className="transition-delay:50ms">s</span>
                <span style={spanStyle} className="transition-delay:100ms">e</span>
                <span style={spanStyle} className="transition-delay:150ms">r</span>
                <span style={spanStyle} className="transition-delay:200ms">n</span>
                <span style={spanStyle} className="transition-delay:250ms">a</span>
                <span style={spanStyle} className="transition-delay:300ms">m</span>
                <span style={spanStyle} className="transition-delay:350ms">e</span>
            </label>
        </div>
    );
}

export default Dinput;