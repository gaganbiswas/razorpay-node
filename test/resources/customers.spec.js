"use strict";

import { assert } from "chai";
import rzpInstance from "../razorpay.js";
import mocker from "../mocker.js";
import equal from "deep-equal";
import { describe, it } from "mocha";

describe("CUSTOMERS", () => {
  it("Create Customer", (done) => {
    let params = {
      name: "test",
      email: "test@razorpay.com",
      contact: "123456789",
      notes: {
        note1: "This is note1",
        note2: "This is note2",
      },
    };

    let expectedParams = {
      name: "test",
      email: "test@razorpay.com",
      contact: "123456789",
      notes: {
        note1: "This is note1",
        note2: "This is note2",
      },
    };

    mocker.mock({
      url: "/customers",
      method: "POST",
    });

    rzpInstance.customers.create(params).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        "/v1/customers",
        "Create customer request url formed"
      );
      assert.ok(
        equal(response.__JUST_FOR_TESTS__.requestBody, expectedParams),
        "All params are passed in request body"
      );
      done();
    });
  });

  it("Edit Customer", (done) => {
    const TEST_CUSTOMER_ID = "cust_6fqBqgrfTSuj5v";
    let params = {
      name: "test",
      email: "test@razorpay.com",
      contact: "123456789",
      notes: {
        note1: "This is note1",
      },
    };

    let expectedParams = {
      name: "test",
      email: "test@razorpay.com",
      contact: "123456789",
      notes: {
        note1: "This is note1",
      },
    };

    mocker.mock({
      url: `/customers/${TEST_CUSTOMER_ID}`,
      method: "PUT",
    });

    rzpInstance.customers.edit(TEST_CUSTOMER_ID, params).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/customers/${TEST_CUSTOMER_ID}`,
        "Edit customer request url formed"
      );

      assert.ok(
        equal(response.__JUST_FOR_TESTS__.requestBody, expectedParams),
        "All params are passed in request body"
      );
      done();
    });
  });

  it("Customer fetch", (done) => {
    const TEST_CUSTOMER_ID = "cust_6fqBqgrfTSuj5v";

    mocker.mock({
      url: `/customers/${TEST_CUSTOMER_ID}`,
    });

    rzpInstance.customers.fetch(TEST_CUSTOMER_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/customers/${TEST_CUSTOMER_ID}`,
        "Fetch customer url formed correctly"
      );
      done();
    });
  });

  it("Fetch all customer ", (done) => {
    let expectedParams = {
      skip: 0,
      count: 10,
    };

    mocker.mock({
      url: `/customers`,
    });

    rzpInstance.customers.all({ skip: 0, count: 10 }).then((response) => {
      assert.ok(
        equal(response.__JUST_FOR_TESTS__.requestQueryParams, expectedParams),
        "skip & count are passed as default queryparams"
      );
      done();
    });
  });

  it("Tokens fetch", (done) => {
    const TEST_CUSTOMER_ID = "cust_6fqBqgrfTSuj5v";

    mocker.mock({
      url: `/customers/${TEST_CUSTOMER_ID}/tokens`,
    });

    rzpInstance.customers.fetchTokens(TEST_CUSTOMER_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/customers/${TEST_CUSTOMER_ID}/tokens`,
        "Fetch customer tokens url formed correctly"
      );
      done();
    });
  });

  it("Token fetch", (done) => {
    const TEST_CUSTOMER_ID = "cust_6fqBqgrfTSuj5v";
    const TEST_TOKEN_ID = "tkn_YDovP0Tg6fpsp";

    mocker.mock({
      url: `/customers/${TEST_CUSTOMER_ID}/tokens/${TEST_TOKEN_ID}`,
    });

    rzpInstance.customers
      .fetchToken(TEST_CUSTOMER_ID, TEST_TOKEN_ID)
      .then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v1/customers/${TEST_CUSTOMER_ID}/tokens/${TEST_TOKEN_ID}`,
          "Fetch customer token url formed correctly"
        );
        done();
      });
  });

  it("Token delete", (done) => {
    const TEST_CUSTOMER_ID = "cust_6fqBqgrfTSuj5v";
    const TEST_TOKEN_ID = "tkn_YDovP0Tg6fpsp";

    mocker.mock({
      url: `/customers/${TEST_CUSTOMER_ID}/tokens/${TEST_TOKEN_ID}`,
      method: "DELETE",
    });

    rzpInstance.customers
      .deleteToken(TEST_CUSTOMER_ID, TEST_TOKEN_ID)
      .then((response) => {
        assert.equal(
          response.__JUST_FOR_TESTS__.url,
          `/v1/customers/${TEST_CUSTOMER_ID}/tokens/${TEST_TOKEN_ID}`,
          "Delete customer token url formed correctly"
        );
        done();
      });
  });
});
