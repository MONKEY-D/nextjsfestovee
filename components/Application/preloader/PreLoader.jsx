import React from "react";

const PreLoader = () => {
  return (
    <div>
      <div className="preloader-progress">
        <div className="preloader-progress-bar"></div>
        <div className="preloader-logo">
          <h1>Festovee</h1>
        </div>
      </div>

      <div className="preloader-mask"></div>
      <div className="preloader-footer">
        <p>Your Website is loading Please wait!!</p>
      </div>
    </div>
  );
};

export default PreLoader;
