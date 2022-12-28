// FOR DEPLOYMENT ONLY
// We replace the start pay method with path app/product_html #start_pay() method after deployment.
async function startPay() {
  if (!price) {
    return;
  }

  let loading = weui.loading("loading", {});

  var res = await window.fetch(baseUrl + "/create/order", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "diamond_" + price,
      amount: price + "",
    }),
  });

  await res
    .text()
    .then((rawRequest) => {
      if (!rawRequest) {
        return;
      }
      if (!window.consumerapp) {
        console.log("This page is not open in app");
        return;
      }
      window.consumerapp.evaluate(
        JSON.stringify({
          functionName: "js_fun_start_pay",
          params: {
            rawRequest: rawRequest,
          },
        })
      );
    })
    .finally(() => {
      loading.hide();
    });
}
