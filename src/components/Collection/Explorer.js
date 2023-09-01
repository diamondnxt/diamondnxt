import Card from "./Card";
import json from "../json/_metadata.json";
import { useState } from "react";

const Explorer = () => {

    const data = useState(json)[0];

    return (
        <>
            <div>
                <div>
                    {data.map((value, index) => {
                        return <Card data={value} key={index}></Card>;
                    })}
                </div>

            </div>
        </>
    );

}

export default Explorer;