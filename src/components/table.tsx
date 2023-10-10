"use client";

import { useState } from "react";
import { formatFileSize, useCSVReader } from "react-papaparse";

export default function Table() {
  const { CSVReader } = useCSVReader();
  const [col, setCol] = useState<string[]>([]);
  const [val, setVal] = useState<string[][]>([]);
  const [limit, setLimit] = useState<number>(50);

  //   console.log(val);

  const handleCelClick = (i: number, tdi: number) => {
    console.log(i);
    console.log(val[i][tdi]);
  };

  return (
    <div>
      <p>Table</p>
      <CSVReader
        config={{ worker: true }}
        onUploadAccepted={(results: any) => {
          const value: string[][] = results.data;
          const filtered = value.filter((_, i) => i !== 0);
          setCol(value[0]);
          setVal(filtered);
        }}
        noDrag
      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
          Remove,
        }: any) => (
          <>
            <div {...getRootProps()}>
              {acceptedFile ? null : (
                <button className="p-2 border-2 rounded-md m-2">
                  CSV file upload
                </button>
              )}
            </div>
            {acceptedFile ? (
              <>
                <div className="flex flex-col mx-auto">
                  <p>{acceptedFile.name}</p>
                  <span>{formatFileSize(acceptedFile.size)}</span>
                </div>
                <div>
                  <table>
                    <thead>
                      <tr>
                        {col.length > 0 &&
                          col.map((col: string, i: number) => (
                            <th key={i}>{col}</th>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {val.map(
                        (val: string[], i: number) =>
                          i > limit &&
                          i < limit + 50 && (
                            <tr key={i}>
                              {val.map((v, tdi) => (
                                <td
                                  key={tdi}
                                  onClick={() => handleCelClick(i, tdi)}
                                >
                                  {v}
                                </td>
                              ))}
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            ) : null}
            {acceptedFile && (
              <div className="flex flex-row">
                {/* <p>{val.length + 1} companies found</p> */}
                <button
                  disabled={limit <= 50}
                  onClick={() => {
                    setLimit(limit - 50);
                  }}
                  className="my-4 p-4 border-1 border-black rounded-md"
                >
                  Back
                </button>
                <p>
                  Page: {limit / 50}/{Math.round(val.length / 50 + 1)}
                </p>
                {/* <p>{limit} companies displayed</p> */}
                <button
                  //   disabled={limit >= val.length + 1}
                  onClick={() => {
                    setLimit(limit + 50);
                  }}
                  className="my-4 p-4 border-1 border-black rounded-md"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </CSVReader>
    </div>
  );
}
