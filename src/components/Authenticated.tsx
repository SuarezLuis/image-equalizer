import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";

import "react-image-crop/dist/ReactCrop.css";
import colors from "../enums/colors";

import Button from "./Shared/Button";
import Picture from "./Picture";

interface Props {}

const Authenticated = (props: Props) => {
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const [fileList, setFileList] = useState<FileList | string[] | null>(null);
  const [fileArray, setFileArray] = useState<File[]>([]);
  const [objectURLArray, setObjectURLArray] = useState<string[]>([]);
  const [imageArray, setImageArray] = useState<HTMLImageElement[]>([]);
  const [dimensions, setDimensions] = useState<any>({});
  const [ratioWidth, setRatioWidth] = useState(1);
  const [ratioHeight, setRatioHeight] = useState(1);
  const [isRatioCustom, setIsRatioCustom] = useState(false);

  interface IDimension {
    width: number;
    height: number;
  }

  const handleRatioChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    switch (e.target.value) {
      case "1:1":
        setRatioWidth(1);
        setRatioHeight(1);
        setIsRatioCustom(false);
        break;
      case "4:3":
        setRatioWidth(4);
        setRatioHeight(3);
        setIsRatioCustom(false);
        break;
      case "16:10":
        setRatioWidth(16);
        setRatioHeight(10);
        setIsRatioCustom(false);
        break;
      case "16:9":
        setRatioWidth(16);
        setRatioHeight(9);
        setIsRatioCustom(false);
        break;
      case "2:1":
        setRatioWidth(2);
        setRatioHeight(1);
        setIsRatioCustom(false);
        break;
      case "5:4":
        setRatioWidth(5);
        setRatioHeight(4);
        setIsRatioCustom(false);
        break;
      case "3:2":
        setRatioWidth(3);
        setRatioHeight(2);
        setIsRatioCustom(false);
        break;
      case "custom":
        setIsRatioCustom(true);
        break;

      default:
        break;
    }
  };

  return (
    <Wrapper>
      <HidenInput
        ref={hiddenInputRef}
        multiple
        type="file"
        onChange={(e) => {
          setDimensions({});
          setFileList(e.currentTarget.files);
          let newFileArray: File[] = [];
          let newObjectURLArray: string[] = [];
          let newImageArray: HTMLImageElement[] = [];
          let newDimensions: IDimension[] = [];
          Array.from(e.currentTarget.files || []).forEach((file) => {
            newFileArray.push(file);
            newObjectURLArray.push(URL.createObjectURL(file));
            const img = new Image();
            img.src = URL.createObjectURL(file);
            console.log(file);
            img.onload = (e: any) => {
              console.log(e);
              console.log(e.path[0].naturalWidth);
              console.log(e.path[0].naturalHeight);
              setDimensions((prevState: any) => {
                prevState[file.name] = {
                  width: e.path[0].naturalWidth,
                  height: e.path[0].naturalHeight,
                };
                return prevState;
              });
            };
            newImageArray.push(img);
          });
          setFileArray(newFileArray);
          setObjectURLArray(newObjectURLArray);
          setImageArray(newImageArray);
        }}
      />
      <div>
        <Button
          buttonColor={colors.yellow}
          text="Upload Files"
          onClick={() => {
            hiddenInputRef?.current?.click();
          }}
        />
      </div>
      {fileList?.length ? (
        <div>
          Ratio:{" "}
          <StyledSelect onChange={handleRatioChange}>
            <option value="1:1">1:1 Square</option>
            <option value="4:3">4:3 Standard</option>
            <option value="16:10">16:10 Standard</option>
            <option value="16:9">16:9 Standard</option>
            <option value="2:1">2:1</option>
            <option value="5:4">5:4</option>

            <option value="3:2">3:2</option>
            <option value="custom">Custom</option>
          </StyledSelect>
          {fileList?.length && isRatioCustom ? (
            <>
              <StyledInput
                type="number"
                min="1"
                value={ratioWidth}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setRatioWidth(parseInt(e.target.value));
                }}
              />{" "}
              :{" "}
              <StyledInput
                type="number"
                min="1"
                value={ratioHeight}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setRatioHeight(parseInt(e.target.value));
                }}
              />
            </>
          ) : null}
        </div>
      ) : null}

      <Preview>
        {fileArray?.map((file, index) => {
          if (fileList) {
            return (
              <Picture
                source={objectURLArray[index]}
                filename={file.name}
                dimensions={dimensions}
                ratioWidth={ratioWidth}
                ratioHeight={ratioHeight}
              />
            );
          }
          return null;
        })}
      </Preview>
    </Wrapper>
  );
};

export default Authenticated;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HidenInput = styled.input`
  display: none;
`;

const Preview = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const StyledSelect = styled.select`
  background-color: ${colors.yellow};
  padding: 10px;
  border-radius: 10px;
  margin: 10px 20px 20px 0;
  box-shadow: none;
  border: none;
`;

const StyledInput = styled.input`
  background-color: ${colors.yellow};
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0 20px 0;
  width: 75px;
  box-shadow: none;
  border: none;
`;
