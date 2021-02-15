// 导入样式
import "@S/less/head-nav.less";
// antd
import { Result, Button } from "antd";

function ErrorPage(props) {
  const { history } = props;
  return (
    <section
      style={{
        position: "fixed",
        zIndex: 555,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        background: "rgb(240,242,245)",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => history.push("/")}>
            Back Home
          </Button>
        }
      />
    </section>
  );
}
export default ErrorPage;
