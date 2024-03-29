// This is the baseline class for all objects that exist on the canvas.
// Everything rendered to the canvas should extend from this at some point.

import { Vec2 } from "./Vector";
import { Component } from "./components/Component";
import { ObjectManager } from "../ObjectManager";
import { BackgroundRenderer } from "./components/BackgroundRenderer";
import { GenericRenderer } from "./components/GenericRenderer";
import { CloudRenderer } from "./components/CloudRenderer";
import { CircleRenderer } from "./components/CircleRenderer";
import { EnvironmentManager } from "../EnvironmentManager";

export class SimObject {
  position: Vec2 = new Vec2();
  scale: Vec2 = new Vec2();
  components: Component[] = []; // unlike Unity, I'll just leave this exposed
  objectManager: ObjectManager; // Manages everything about the object
  environmentManager: EnvironmentManager; // Manages everything about the environment
  constructor(
    objectManager: ObjectManager,
    environmentManager: EnvironmentManager,
    initialPosition?: Vec2,
    initialScale?: Vec2
  ) {
    if (initialPosition) {
      this.position = initialPosition;
    }

    if (initialScale) {
      this.scale = initialScale;
    }

    this.objectManager = objectManager;
    this.environmentManager = environmentManager;
  }

  addComponent = (component: Component): Component => {
    component.root = this;
    this.components.push(component);
    if (
      component instanceof BackgroundRenderer ||
      component instanceof GenericRenderer ||
      component instanceof CloudRenderer ||
      component instanceof CircleRenderer
    ) {
      this.objectManager.RendererList.push(component);
    }

    return this.components[this.components.length - 1]; // Returning the simobject to allow chaining when making objects
  };

  start = () => {
    this.components.forEach((component) => {
      component.start();
    });
  };

  update = () => {};
}
