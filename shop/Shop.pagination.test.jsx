import React from "react";
import { act, create } from "react-test-renderer";
import { describe, expect, it, vi } from "vitest";

vi.mock("../components/PageHeader", () => ({ default: () => null }));
vi.mock("./Search", () => ({ default: () => null }));
vi.mock("./ShopCategory", () => ({ default: () => null }));
vi.mock("./PopularPost", () => ({ default: () => null }));
vi.mock("./Tags", () => ({ default: () => null }));
vi.mock("./ProductCards", async () => {
  const ReactModule = await vi.importActual("react");
  return {
    default: ({ products }) =>
      ReactModule.createElement(
        "div",
        { "data-testid": "product-list" },
        products.map((product) =>
          ReactModule.createElement("span", {
            key: product.id,
            "data-product-id": product.id,
          })
        )
      ),
  };
});

import Shop from "./Shop";

function renderShop() {
  let renderer;
  act(() => {
    renderer = create(<Shop />);
  });
  return renderer;
}

function visibleProductIds(renderer) {
  return renderer.root
    .findAll((node) => node.props["data-product-id"] !== undefined)
    .map((node) => node.props["data-product-id"]);
}

function pageControls(renderer) {
  return renderer.root.findByProps({ className: "default-pagination lab-ul" });
}

function clickPrevious(renderer) {
  const [previous] = pageControls(renderer).findAllByType("a");
  act(() => previous.props.onClick({ preventDefault() {} }));
}

function clickNext(renderer) {
  const [, next] = pageControls(renderer).findAllByType("a");
  act(() => next.props.onClick({ preventDefault() {} }));
}

function clickPage(renderer, page) {
  const button = pageControls(renderer)
    .findAllByType("button")
    .find((candidate) => candidate.children[0] === String(page));
  act(() => button.props.onClick());
}

describe("shop pagination boundaries", () => {
  it("keeps the product list populated when previous is clicked on page one", () => {
    const renderer = renderShop();
    const firstPageProducts = visibleProductIds(renderer);

    expect(firstPageProducts).toHaveLength(12);
    clickPrevious(renderer);

    expect(visibleProductIds(renderer)).toEqual(firstPageProducts);
  });

  it("moves back one page when previous is clicked on the last page", () => {
    const renderer = renderShop();
    const pageCount = pageControls(renderer).findAllByType("button").length;
    clickPage(renderer, pageCount);
    const lastPageProducts = visibleProductIds(renderer);

    expect(lastPageProducts.length).toBeGreaterThan(0);
    expect(lastPageProducts.length).toBeLessThan(12);
    clickPrevious(renderer);

    const precedingPageProducts = visibleProductIds(renderer);
    expect(precedingPageProducts).toHaveLength(12);
    expect(precedingPageProducts).not.toEqual(lastPageProducts);
  });

  it("advances with next from page one and stays on the last page", () => {
    const renderer = renderShop();
    const firstPageProducts = visibleProductIds(renderer);
    clickNext(renderer);
    const secondPageProducts = visibleProductIds(renderer);

    expect(secondPageProducts).toHaveLength(12);
    expect(secondPageProducts).not.toEqual(firstPageProducts);

    const pageCount = pageControls(renderer).findAllByType("button").length;
    clickPage(renderer, pageCount);
    const lastPageProducts = visibleProductIds(renderer);
    clickNext(renderer);

    expect(visibleProductIds(renderer)).toEqual(lastPageProducts);
  });
});
