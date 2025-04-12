import { test, expect } from "@playwright/test";
import { RUB_MIN, RUB_MAX, RUB_STEP, USDT_STEP } from "../src/constants";

test.describe("Exchange Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load with initial values", async ({ page }) => {
    const rubInput = page.getByTestId("rub-input");
    await expect(rubInput).toHaveValue(String(RUB_MIN));

    const usdtInput = page.getByTestId("usdt-input");
    await expect(usdtInput).toBeDefined();
  });

  test("should update values when clicking percentage buttons", async ({
    page,
  }) => {
    const rubButtons = page.locator('button[data-text="25%"]').nth(0);
    await rubButtons.click();

    const expectedRubValue = RUB_MAX * 0.25;
    const rubInput = page.getByTestId("rub-input");
    await expect(rubInput).toHaveValue(String(expectedRubValue));
  });

  test("should respect min/max constraints", async ({ page }) => {
    const rubInput = page.getByTestId("rub-input");

    await rubInput.fill(String(RUB_MIN - 1000));
    await rubInput.blur();
    await expect(rubInput).toHaveValue(String(RUB_MIN));

    await rubInput.fill(String(RUB_MAX + 1000));
    await rubInput.blur();
    await expect(rubInput).toHaveValue(String(RUB_MAX));
  });

  test("should respect step values", async ({ page }) => {
    const rubInput = page.getByTestId("rub-input");

    await rubInput.fill(String(RUB_MIN));
    await page.keyboard.press("ArrowUp");
    await expect(rubInput).toHaveValue(String(RUB_MIN + RUB_STEP));

    const usdtInput = page.getByTestId("usdt-input");
    const currentValue = await usdtInput.inputValue();
    await usdtInput.focus();
    await page.keyboard.press("ArrowUp");
    const newValue = await usdtInput.inputValue();
    expect(Number(newValue) - Number(currentValue)).toBeCloseTo(USDT_STEP);
  });

  test("should maintain focus during validation", async ({ page }) => {
    const rubInput = page.getByTestId("rub-input");

    await rubInput.focus();
    await rubInput.fill(String(RUB_MAX + 1000));

    await expect(rubInput).toBeFocused();
  });

  test("should update both inputs after API response", async ({ page }) => {
    const rubInput = page.getByTestId("rub-input");
    const usdtInput = page.getByTestId("usdt-input");

    await rubInput.fill(String(RUB_MIN + RUB_STEP));
    await rubInput.blur();

    await page.waitForTimeout(1500);

    await expect(rubInput).not.toHaveValue(String(RUB_MIN));
    await expect(usdtInput).not.toHaveValue("0");
  });
});
