// import React from 'react';
// import Uppy from '@uppy/core';
// import Tus from '@uppy/tus';
// import Webcam from '@uppy/webcam';
// import Dashboard from '@uppy/dashboard';

// // const uppy = Uppy({
// //   meta: { type: 'avatar' },
// //   restrictions: { maxNumberOfFiles: 1 },
// //   autoProceed: true,
// // });

// // uppy.use(Tus, { endpoint: '/upload' });

// // uppy.on('complete', result => {
// //   const url = result.successful[0].uploadURL;
// //   store.dispatch({
// //     type: 'SET_USER_AVATAR_URL',
// //     payload: { url: url },
// //   });
// // });

// const uppy = Uppy({
//   debug: true,
//   autoProceed: false,
//   restrictions: {
//     maxFileSize: 1000000,
//     maxNumberOfFiles: 3,
//     minNumberOfFiles: 2,
//     allowedFileTypes: ['image/*', 'video/*'],
//   },
// }).use(Dashboard, {
//   trigger: '.UppyModalOpenerBtn',
//   inline: true,
//   target: '.DashboardContainer',
//   replaceTargetContent: true,
//   showProgressDetails: true,
//   note: 'Images and video only, 2–3 files, up to 1 MB',
//   height: 470,
//   metaFields: [
//     { id: 'name', name: 'Name', placeholder: 'file name' },
//     { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' },
//   ],
//   browserBackButtonClose: true,
// });
// uppy.use(Webcam, { target: Dashboard });
// uppy.use(Tus, { endpoint: '/upload' });

// uppy.on('complete', result => {
//   console.log('successful files:', result.successful);
//   console.log('failed files:', result.failed);
// });

// const Uploader = ({ currentAvatar }) => {
//   return (
//     <div>
//       <img src={currentAvatar} alt="Current Avatar" />
//       <Dashboard uppy={uppy} />
//     </div>
//   );
// };
// export default Uploader;
