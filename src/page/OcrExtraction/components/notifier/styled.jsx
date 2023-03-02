import styled from "styled-components";

const NotifierWrapper = styled.div`
  .notifier {
    right: 30px;
    z-index: 9999;
    height: 75px;
    width: 400px;
    display: flex;
    position: fixed;
    padding: 0 10px;
    border-radius: 5px;
    align-items: center;
    box-sizing: border-box;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);

    .img {
      height: 25px;
    }

    .content {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
    }

    .text {
      font-weight: 600;
      font-size: 18px;
      text-transform: capitalize;
    }
  }

  .success {
    color: #0f802d;
    background-color: rgb(225, 255, 241);
  }

  .error {
    color: #96111e;
    background-color: rgb(255, 225, 228);
  }
`;

export { NotifierWrapper };
