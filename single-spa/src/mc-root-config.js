import { registerApplication, start } from "single-spa";

fetch("http://localhost:3000/applications")
  .then((resp) => resp.json())
  .then((data) => {
    data
      .filter((app) => app?.show)
      .forEach((app) => {
        registerApplication({
          name: app.name,
          app: () => System.import(app.package),
          activeWhen: app.exact
            ? (location) => location.pathname === app.route
            : [app.route],
        });
      });
  })
  .finally(() => {
    start({
      urlRerouteOnly: true,
    });
  });
