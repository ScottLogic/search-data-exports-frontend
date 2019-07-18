import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ExportResultsModal from "./ExportResultsModal";

Enzyme.configure({ adapter: new Adapter() });

describe("<ExportResultsModal />", () => {
  let wrapper;

  const closeCallback = jest.fn();
  const submitCallback = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <ExportResultsModal
        showModal={true}
        showDirectDownloadOption={true}
        closeCallback={closeCallback}
        submitCallback={submitCallback}
      />
    );
  });

  it("Renders the direct download option when showDirectDownloadOption is true", () => {
    expect(wrapper.find(".direct-download").get(0).props.style).toHaveProperty('display', undefined);;
  });

  it("Does not render the direct download option when showDirectDownloadOption is false", () => {
    wrapper = shallow(
      <ExportResultsModal
        showModal={true}
        showDirectDownloadOption={false}
        closeCallback={closeCallback}
        submitCallback={submitCallback}
      />
    );
    expect(wrapper.find("div.direct-download").get(0).props.style).toHaveProperty('display', 'none');;
  });

  it("Renders the direct download option when showDirectDownloadOption is true", () => {
    expect(wrapper.find("div.direct-download").get(0).props.style).toHaveProperty('display', undefined);;
  });

  it("Shows the email form input text field when the email radio is selected", () => {
    wrapper.find('input#email').simulate('change', { target: { checked: true, id: "email" }, persist: jest.fn() });
    expect(wrapper.find('input#emailInput').get(0).props.type).toEqual("email");
  });

  it("Hides the email form input text field when the email radio is not selected", () => {
    expect(wrapper.find('input#emailInput').get(0).props.type).toEqual("hidden");
  });

  it("Submits the form data when the submit button is clicked", () => {
    wrapper.find('input#email').simulate('change', { target: { checked: true, id: "email" }, persist: jest.fn() });
    wrapper.find('input#emailInput').simulate('change', {target: {value: "hello@world.com"}, persist: jest.fn() });
    wrapper.find('form.export-results-form').simulate('submit');
    expect(submitCallback).toHaveBeenCalledTimes(1);
    expect(submitCallback).toHaveBeenCalledWith({selectedType: "email", emailInput: "hello@world.com" });
  });
});
