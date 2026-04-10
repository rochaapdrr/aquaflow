package com.rocha.aquaflow;

import com.rocha.aquaflow.cli.ConsoleApp;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@SpringBootTest
@ActiveProfiles("test")
class AquaflowApplicationTests {

	// A trava de segurança precisava estar AQUI também!
	@MockitoBean
	private ConsoleApp consoleApp;

	@Test
	void contextLoads() {
	}

}
