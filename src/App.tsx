import React from "react";
import { Quiz } from "./components/Quiz";
import { BackgroundWrapper } from "./components/BackgroundWrapper";

const App: React.FC = () => {
    return (
        <BackgroundWrapper>
            <Quiz />
        </BackgroundWrapper>
    );
};

export default App;
