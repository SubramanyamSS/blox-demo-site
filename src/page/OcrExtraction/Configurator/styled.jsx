import styled from "styled-components";

const ConfiguratorWrapper = styled.div`
    & .configurator {
        display: flex;
        background-color: rgb(221 223 229);
        height: 100vh
        min-width: 1400px
    }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderIcon = styled.img`
  width: 45px;
  height: 45px;
`;

const TableWrapper = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: left;
  th {
    // background: rgba(177,197,252) !important;
    // color: #FFF;
    font-weight: 700 !important;
    font-family: Poppins_Medium !important;
    text-transform: capitalize;
  }

  td,
  th {
    background-color: #fff;
    padding: 10px;
    // border-bottom: solid 0.5px #d9d9d9;
    // border-right: solid 0.5px #d9d9d9;
    // font-weight: 600;
    font-family: Poppins_Regular !important;
    font-size: 13px;
    width: calc(50%);
    // text-align: left;
    // border-radius: 10px;
    &:first-child {
      // padding-left: 0;
      font-weight: 600;
    }
    &.font-light {
      font-weight: 300;
    }
    &:nth-child(2) {
      // width: 55%;
      font-weight: 300;
      // text-align: center;
    }
    &:last-child {
      // width: 15%;
      font-weight: 300;
      // text-align: right;
      border-right: none;
      padding-right: 0;
    }
  }

  tr {
    display: flex;
    justify-content: space-between;
    // margin-bottom: 8px;
    &:nth-child(2n+1) {
      td {
        background-color: #e4e7ff;
      }
    }
    &:last-child {
      td {
        border-bottom: none;
      }
    }
  }
  tbody tr {
    cursor: pointer;
  }
`;

export { ConfiguratorWrapper, TableWrapper };
