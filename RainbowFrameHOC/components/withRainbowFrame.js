import React from 'react';

function withRainbowFrame(colors) {
    return function(Component) {
        return props => {
            let Frame = <Component {...props} />;
            colors.forEach(color => 
            { 
                Frame = <div style={{border:"solid 8px "+ color,padding:"10px"}}>
                    {Frame}
                </div>
            });
            return Frame;
        };
    };
}

export { withRainbowFrame };
