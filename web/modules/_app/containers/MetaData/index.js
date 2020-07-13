import React from 'react';
import Head from 'next/head';
import initReactFastclick from 'react-fastclick';
import 'antd/dist/antd.css';
import 'react-virtualized/styles.css';
import './style.sass';

initReactFastclick();

export default () => (
  <Head>
    <title>PROJECT</title>

    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
    <meta name="msapplication-TileImage" content="./ms-icon-144x144.png" />
    <meta name="application-name" content="Brade.js" />

    {/* <!-- START - Open Graph for Facebook, Google+ and Twitter Card Tags--> */}
    {/* <!-- Facebook Open Graph --> */}
    <meta property="og:locale" content="ru_RU" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Brade.js" />
    <meta property="og:title" content="Brade.js" />
    <meta property="og:url" content="http://" />
    <meta property="og:description" content="..." />
    <meta property="og:image" content="http://" />
    <meta property="article:publisher" content="https://www.facebook.com/bradejs" />
    {/* <!-- Google+ / Schema.org --> */}
    <meta itemProp="name" content="Brade.js" />
    <meta itemProp="headline" content="Brade.js" />
    <meta itemProp="description" content="..." />
    <meta itemProp="image" content="http://" />
    {/* <!-- Twitter Cards --> */}
    <meta name="twitter:title" content="Brade.js" />
    <meta name="twitter:url" content="http://" />
    <meta name="twitter:description" content="..." />
    <meta name="twitter:image" content="http://" />
    <meta name="twitter:card" content="summary_large_image" />
    {/* <!-- SEO --> */}
    <link rel="canonical" href="http://" />
    <meta name="description" content="..." />
    <meta name="keywords" content="cms" />
    <meta name="publisher" content="Brade.js" />
    {/* END - Open Graph for Facebook, Google+ and Twitter Card Tags */}

    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="apple-mobile-web-app-title" content="Brade.js" />

    <link rel="apple-touch-icon" sizes="57x57" href="./apple-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="./apple-icon-60x60.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="./apple-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="./apple-icon-76x76.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="./apple-icon-114x114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="./apple-icon-120x120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="./apple-icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="./apple-icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="./apple-icon-180x180.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="./android-icon-192x192.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="./favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png" />
    <link rel="icon" href="/favicon.ico" />

    <link rel="manifest" href="/manifest.json" />

    {/* Custom Libs Settings */}
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/codemirror.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/theme/material.min.css"
    />

    {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.55.0/mode/javascript/javascript.min.js"></script> */}

    {/* <link rel="alternate" hreflang="en" href="https://"> */}
  </Head>
);
