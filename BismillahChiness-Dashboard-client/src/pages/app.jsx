/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/overview/view';

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Bismillah-Chiness </title>
      </Helmet>

      <AppView />
    </>
  );
}
