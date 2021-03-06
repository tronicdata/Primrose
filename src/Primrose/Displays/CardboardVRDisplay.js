/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import FusionPoseSensor from "./SensorFusion/FusionPoseSensor";
import VRDisplay from "./VRDisplay";
import isiOS from "../../flags/isiOS";
import isLandscape from "../../flags/isLandscape";

var Eye = {
  LEFT: "left",
  RIGHT: "right"
};

export default class CardboardVRDisplay extends VRDisplay {
  constructor(options) {
    super("Google Cardboard");
    this.DOMElement = null;

    // "Private" members.
    this.poseSensor_ = options && options.overrideOrientation || new FusionPoseSensor(options);
  }

  _getImmediatePose() {
    return this.poseSensor_.getImmediatePose();
  }

  resetPose() {
    this.poseSensor_.resetPose();
  }

  getEyeParameters(whichEye) {
    var offset = [0.03, 0.0, 0.0];

    if (whichEye == Eye.LEFT) {
      offset[0] *= -1.0;
    }

    var width = screen.width,
      height = screen.height;

    if(this.DOMElement){
      width = this.DOMElement.clientWidth;
      height = this.DOMElement.clientHeight;
    }
    else if(isiOS && isLandscape()) {
      var temp = width;
      width = height;
      height = temp;
    }

    width *= devicePixelRatio;
    height *= devicePixelRatio;

    return {
      fieldOfView: {
        upDegrees: 40,
        leftDegrees: 40,
        rightDegrees: 40,
        downDegrees: 40
      },
      offset: offset,
      renderWidth: 0.5 * width,
      renderHeight: height,
    }
  }
};