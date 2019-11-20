import { expect } from "chai";
import { mount } from "@vue/test-utils";
import TablePagination from "@/components/TablePagination.vue";


describe("TablePagination.vue", () => {
  it("currentPage must be greater than 0", () => {
    const wrapper = mount(TablePagination, {
      propsData: {
        current_page: -1
      }
    });
    expect(wrapper.vm.currentPage).to.equal(1);
  });
});

describe("TablePagination.vue", () => {
  it("currentPage must be greater than 0 on current_page change", () => {
    const wrapper = mount(TablePagination);
    wrapper.setData({ current_page: -1 });
    expect(wrapper.vm.currentPage).to.equal(1);
  });
});

describe("TablePagination.vue", () => {
  it("currentPage must be greater than 0 on current_page change", () => {
    const wrapper = mount(TablePagination);
    wrapper.setData({ current_page: -1 });
    expect(wrapper.vm.currentPage).to.equal(1);
  });
});
