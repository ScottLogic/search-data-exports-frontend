import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ExportResultsModal from "./ExportResultsModal";

Enzyme.configure({ adapter: new Adapter() });

describe("<ExportResultsModal />", () => {
  let wrapper;

  const modalProps = {
    showModal: true,
    lastRequest: {},
    totalHitsCount: 0,
    closeModal: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<ExportResultsModal {...modalProps} />);
  });

  it("Renders the direct download option when showDirectDownloadOption is true", () => {
    expect(wrapper.find(".direct-download").get(0).props.style).toHaveProperty('display', undefined);;
  });

  it("Does not render the direct download option when the total hits is greater than 100", () => {
    const updatedProps = {
      ...modalProps,
      totalHitsCount: 101
    };
    
    wrapper = shallow(
      <ExportResultsModal {...updatedProps} />
    );
    expect(wrapper.find("div.direct-download").get(0).props.style).toHaveProperty('display', 'none');;
  });

  it("Renders the direct download option when the total hits is less than 100", () => {
    expect(wrapper.find("div.direct-download").get(0).props.style).toHaveProperty('display', undefined);;
  });

  it("Shows the email form input text field when the email radio is selected", () => {
    wrapper.find('input#email').get(0).props.onChange({ target: { value: 'email' } });
    expect(wrapper.find('input#emailInput').get(0).props.type).toEqual("email");
  });

  it("Hides the email form input text field when the email radio is not selected", () => {
    expect(wrapper.find('input#emailInput').get(0).props.type).toEqual("hidden");
  });

  it("Submits the form data when the submit button is clicked", () => {
    wrapper.find('input#email').get(0).props.onChange({ target: { value: 'email' } });
    wrapper.find('input#emailInput').simulate('change', {target: {value: "hello@world.com"}, persist: jest.fn() });
    wrapper.find('form.export-results-form').simulate('submit');
    expect(modalProps.closeModal).toHaveBeenCalledTimes(1);
  });
});
