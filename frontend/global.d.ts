import 'react';

declare module 'react' {
    interface IntrinsicElements {
        selectedcontent: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
}