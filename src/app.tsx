import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layouts/main-layout";
import Fallback from "./fallback";
import Provider from "./provider";

function MainRouter() {
  return (
    <MainLayout>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" Component={React.lazy(() => import("./pages/main/index"))} />
            <Route path="/search" Component={React.lazy(() => import("./pages/main/search"))} />
            <Route path="/shelf" Component={React.lazy(() => import("./pages/main/shelf"))} />
          </Routes>
        </Suspense>
      </MainLayout>
  )
}

export default function App() {
  return (
    <Provider>
      <Suspense fallback={<Fallback />}>
        <BrowserRouter>

          <Routes>
            <Route path="/hello" element={<div>HELLO WORLD</div>} />
            <Route path="/*" element={<MainRouter />} />
          </Routes>

        </BrowserRouter>
      </Suspense>
    </Provider>
  );
}
