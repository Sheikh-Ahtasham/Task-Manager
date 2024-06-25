import React from "react"
import { Layout, Row, Col } from "antd"

const { Footer: AntFooter } = Layout

const Footer: React.FC = () => {
  return (
    <AntFooter className="bg-slate-100 border-t border-gray-200 p-[18px]">
      <Row justify="center" align="middle">
        <Col>
          <div className="text-center">
            <span className="block mb-2">© 2024, made by Ahtasham Athar.</span>
          </div>
        </Col>
      </Row>
    </AntFooter>
  )
}

export default Footer
