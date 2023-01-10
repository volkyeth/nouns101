import { Global } from "@emotion/react";

export const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'LoRes 12 OT';
        font-style: normal;
        font-weight: normal;
        font-display: swap;
        src: url('/fonts/LoRes12OT-Regular.ttf') format("truetype");
      }
      
      @font-face {
        font-family: 'LoRes 12 OT';
        font-style: normal;
        font-weight: bold;
        font-display: swap;
        src: url('/fonts/LoRes12OT-Bold.ttf') format("truetype");
      }
      
      @font-face {
        font-family: 'LoRes 9 OT';
        font-style: normal;
        font-weight: normal;
        font-display: swap;
        src: url('/fonts/LoRes9OTWide-Regular.ttf') format("truetype");
      }
      
      @font-face {
        font-family: 'LoRes 9 OT';
        font-style: normal;
        font-weight: bold;
        font-display: swap;
        src: url('/fonts/LoRes9OTWide-Bold.ttf') format("truetype");
      }
      
      @font-face {
        font-family: 'LoRes 9 OT';
        font-style: normal;
        font-weight: normal;
        font-display: swap;
        src: url('/fonts/LoRes9OTWide-Regular.ttf') format("truetype");
      }
      
      @font-face {
        font-family: 'LoRes 9 OT';
        font-style: normal;
        font-weight: bold;
        font-display: swap;
        src: url('/fonts/LoRes9OTWide-Bold.ttf') format("truetype");
      }
      `}
  />
);
