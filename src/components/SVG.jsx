import { useEffect, useRef, useState } from "react"

export default function SVG({setState, styles, svgShape}) {
    const [shape, setShape] = useState('');
    const [animating, setAnimating] = useState(false);
    
    const shapes = {
        shoppingCart: 'M13.5 21c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m-6 2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m16.5-16h-2.964l-3.642 15h-13.321l-4.073-13.003h19.522l.728-2.997h3.75v1zm-22.581 2.997l3.393 11.003h11.794l2.674-11.003h-17.861z',
        cancel: 'M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z',
        confirm: 'M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm7 7.457l-9.005 9.565-4.995-5.865.761-.649 4.271 5.016 8.24-8.752.728.685z',
        add: 'M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z',
        angleLeft: 'M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z'
    }

    function svgTimeout(string) {
        // full animation time is 500ms
        let time = 250;
        if (!animating) { time = 0 };

        if (svgShape === string) {
             setTimeout(() => {
                setShape(shapes?.[`${string}`])
            }, time)
        };
    };

    function loadSvg() {
        svgTimeout('shoppingCart');
        svgTimeout('cancel');
        svgTimeout('add');
        svgTimeout('confirm');
    };

    useEffect(() => { loadSvg() }, []);
    useEffect(() => { loadSvg() }, [svgShape]);

    return (
            <svg 
                width="24" 
                onClick={() => {
                    if (setState) { setState(prev => !prev); }
                    setAnimating(true);
                }} 
                height="24" 
                onAnimationEnd={() => {setAnimating(false)}}
                className={`${styles} ${animating ? 'rotate' : '' } self-center cursor-pointer`}
                xmlns="http://www.w3.org/2000/svg" 
                fill-rule="evenodd" 
                clip-rule="evenodd">
                <path 
                d={shape}
                />
            </svg>
    )
};