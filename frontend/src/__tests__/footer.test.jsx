import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";
import { BrowserRouter } from "react-router-dom";

describe("Footer Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  });

  test("Renders brand name", () => {
    const brandNames = screen.getAllByText(/Boutique to Box/i);
    expect(brandNames.length).toBeGreaterThan(0);
  });

  test("Renders main section headings", () => {
    expect(screen.getByText(/Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Company/i)).toBeInTheDocument();
    expect(screen.getByText(/Legal/i)).toBeInTheDocument();
  });

  test("Renders navigation links with their correct hrefs", () => {
    expect(
      screen.getByRole("link", { name: /AI Design Generator/i })
    ).toHaveAttribute("href", "/design");
    expect(screen.getByRole("link", { name: /About Us/i })).toHaveAttribute(
      "href",
      "/about"
    );
    expect(
      screen.getByRole("link", { name: /Privacy Policy/i })
    ).toHaveAttribute("href", "/privacy");
  });

  test("Renders the footer copyright text", () => {
    expect(screen.getByText(/© \d{4} Boutique to Box/i)).toBeInTheDocument();
  });
});
