import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
    it("displays initial click count as 0", () => {
        render(<MyComponent />);
        expect(screen.getByText("Click count: 0")).toBeInTheDocument();
    });

    it("increments click count on each click", () => {
        render(<MyComponent />);
        const container = screen.getByText(/Click count:/).parentElement!;

        // First click
        fireEvent.click(container);
        expect(screen.getByText("Click count: 1")).toBeInTheDocument();

        // Second click
        fireEvent.click(container);
        expect(screen.getByText("Click count: 2")).toBeInTheDocument();

        // Third click
        fireEvent.click(container);
        expect(screen.getByText("Click count: 3")).toBeInTheDocument();
    });

    it("applies custom className when provided", () => {
        const { container } = render(<MyComponent className="custom-class" />);
        expect(container.firstChild).toHaveClass("custom-class");
    });

    it("applies larger height when click count is >= 2", () => {
        render(<MyComponent />);
        const container = screen.getByText(/Click count:/).parentElement!;

        // Trigger click count to reach 3
        fireEvent.click(container); // count = 1
        fireEvent.click(container); // count = 2
        fireEvent.click(container); // count = 3

        // Check the style applied
        const height = getComputedStyle(container).height;

        expect(height).toBe("500px"); // because `isBigger: true`
    });
});
