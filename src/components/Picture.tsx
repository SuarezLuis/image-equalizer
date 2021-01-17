import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import ReactCrop, { Crop } from "react-image-crop";
import Button from "./Shared/Button";
import colors from "../enums/colors";
import getCroppedImg from "../getCroppedImage";

interface Props {
  source: string;
  filename: string;

  ratioWidth: number;
  ratioHeight: number;
}

const Picture = ({
  source,
  filename,

  ratioWidth,
  ratioHeight,
}: Props) => {
  const [crop, setCrop] = useState<Crop>({});
  const [imageProperties, setImageProperties] = useState({
    naturalWidth: 0,
    naturalHeight: 0,
    width: 0,
    height: 0,
  });

  const ImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setCrop((prevState) => {
      const width = imageProperties.width;
      const height = imageProperties.height;
      const ratio = ratioWidth / ratioHeight;
      let newCrop: Crop = { aspect: ratio, width: 0, height: 0 };
      newCrop.x = 0;
      newCrop.y = 0;

      if (ratioWidth > ratioHeight) {
        if (width > height) {
          newCrop.width = width;
          newCrop.height = width / ratio;
        }

        if (width < height) {
          newCrop.width = width;
          newCrop.height = width / ratio;
        }

        if (width === height) {
          newCrop.width = width;
          newCrop.height = height / ratio;
        }
      }

      if (ratioWidth < ratioHeight) {
        if (width > height) {
          newCrop.width = height * ratio;
          newCrop.height = height;
        }

        if (width < height) {
          newCrop.width = height * ratio;
          newCrop.height = height;
        }

        if (width === height) {
          newCrop.width = width * ratio;
          newCrop.height = height;
        }
      }

      if (ratioWidth === ratioHeight) {
        if (width > height) {
          newCrop.width = height;
          newCrop.height = height;
        }

        if (width < height) {
          newCrop.width = width;
          newCrop.height = width;
        }

        if (width === height) {
          newCrop.width = width;
          newCrop.height = height;
        }
      }
      if ((newCrop.width || 0) > width || (newCrop?.height || 0) > height) {
        newCrop.width = newCrop.width ? newCrop.width / 2 : 0;
        newCrop.height = newCrop.height ? newCrop.height / 2 : 0;
      }
      return newCrop;
    });
  }, [
    filename,
    imageProperties.height,
    imageProperties.width,
    ratioHeight,
    ratioWidth,
  ]);

  return (
    <PictureWrapper>
      <ReactCrop
        // keepSelection
        // imageStyle={{ maxHeight: 300 }}
        src={source}
        crop={crop}
        onChange={(crop) => {
          setCrop(crop);
        }}
        onImageLoaded={(image) => {
          const { naturalWidth, naturalHeight, width, height } = image;
          ImageRef.current = image;
          setImageProperties({ naturalWidth, naturalHeight, width, height });
        }}
      />
      <div>{filename}</div>

      <div>
        Original Image: {imageProperties.naturalWidth} x{" "}
        {imageProperties.naturalHeight}
      </div>
      <div>
        Preview: {imageProperties.width} x {imageProperties.height} ;
        {((imageProperties.width || 1) / (imageProperties.height || 1)).toFixed(
          2
        )}
      </div>
      <div>
        Selection: {crop.width} x {crop.height} ;{" "}
        {((crop?.width || 1) / (crop?.height || 1)).toFixed(2)}
      </div>
      <Button
        text="Download"
        buttonColor={colors.green}
        onClick={async () => {
          if (ImageRef.current) {
            const download = await getCroppedImg(
              ImageRef.current,
              crop,
              `equalized-${filename}`
            );

            const tempLink = document.createElement("a");
            tempLink.href = window.URL.createObjectURL(download);
            tempLink.setAttribute("download", `equalized-${filename}`);
            tempLink.click();
          }
        }}
      />
    </PictureWrapper>
  );
};

export default Picture;

const PictureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  min-width: 300px;
  align-items: center;
  margin: 10px;
  border: solid 2px black;
`;
