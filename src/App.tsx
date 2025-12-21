import React from "react";
import { Quiz } from "./components/Quiz";

const App: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div>
                <Quiz />
            </div>
        </div>
    );
};

export default App;
