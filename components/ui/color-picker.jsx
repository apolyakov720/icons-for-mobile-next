"use client";
import { useMemo, useRef, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const styles = {
  picker: {
    width: 200,
    height: 200,
    position: "relative",
    backgroundColor: "yellowgreen",
  },
  marker: {
    position: "absolute",
    width: 28,
    height: 28,
    borderRadius: "50%",
    backgroundColor: "blue",
  },
};

const clamp = (number, min = 0, max = 1) =>
  number > max ? max : number < min ? min : number;

const getParentWindow = (node) => node?.ownerDocument.defaultView || self;

const getPosition = (event, node) => {
  const rect = node.getBoundingClientRect();
  const parent = getParentWindow(node);

  return {
    left: clamp((event.pageX - (rect.left + parent.pageXOffset)) / rect.width),
    top: clamp((event.pageY - (rect.top + parent.pageYOffset)) / rect.height),
  };
};

const ColorCanvas = () => {
  const containerRef = useRef(null);
  const [handleMouseDown, toogleDocumentEvents] = useMemo(() => {
    const handleMouseDown = (event) => {
      const element = containerRef.current;

      if (!element) {
        return;
      }

      event.preventDefault();

      element.focus();

      // Высчитываем позицию

      toogleDocumentEvents(true);
    };

    const handleMouseMove = (event) => {
      const element = containerRef.current;

      event.preventDefault();

      if (event.buttons > 0 && element) {
        //
      } else {
        toogleDocumentEvents();
      }
    };

    const handleMouseUp = () => {
      toogleDocumentEvents();
    };

    function toogleDocumentEvents(flag) {
      const element = containerRef.current;
      const parent = getParentWindow(element);

      const toggleEvent = flag
        ? parent.addEventListener
        : parent.removeEventListener;

      toggleEvent("mousemove", handleMouseMove);
      toggleEvent("mouseup", handleMouseUp);
    }

    return [handleMouseDown, toogleDocumentEvents];
  }, []);

  useEffect(() => toogleDocumentEvents, [toogleDocumentEvents]);

  return (
    <div style={styles.picker} ref={containerRef} onMouseDown={handleMouseDown}>
      <div style={styles.marker} />
    </div>
  );
};

const ColorSlider = () => {
  return (
    <div className="flex items-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="block h-6 w-6 rounded-full border border-primary/50 shrink-0" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Скопировать цвет</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  );
};

/**
 <div className="flex justify-around">
        <Label htmlFor="red">R</Label>
        <Label htmlFor="green">G</Label>
        <Label htmlFor="blue">B</Label>
      </div>
 */

const ColorControlRGB = () => {
  return (
    <div className="flex justify-around space-x-1">
      <Input id="red" placeholder="R" />
      <Input id="green" placeholder="G" />
      <Input id="blue" placeholder="B" />
    </div>
  );
};

const ColorControlHEX = () => {
  return <Input placeholder="#ffffff" />;
};

const ColorControls = () => {
  const [viewType, setViewType] = useState("hex");

  return (
    <div className="flex items-end space-x-1">
      {viewType === "rgb" && <ColorControlRGB />}
      {viewType === "hex" && <ColorControlHEX />}
      <Select defaultValue={viewType} onValueChange={setViewType}>
        <SelectTrigger className="basis-0">
          <SelectValue placeholder="Тип" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Выберите представление цвета</SelectLabel>
            <SelectItem value="hex">HEX</SelectItem>
            <SelectItem value="rgb">RGB</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const ColorPicker = () => {
  return (
    <div className="flex flex-col space-y-4">
      <ColorCanvas />
      <ColorSlider />
      <ColorControls />
    </div>
  );
};

export { ColorPicker };
